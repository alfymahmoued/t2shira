const router = require('express').Router()
const { getPaymobToken, getHMACByOrderId } = require('../payment_helper')
const doc_model = require('../models/doc_model')
const trip_booking = require('../models/trip_booking')
const notification_model = require('../models/notification_model')
const company_model = require('../models/company_model')
const cv_search_types_model = require('../models/cv_search_types_model')

const { sendNotification, serverURL } = require('../helper')

const user_model = require('../models/user_model')


router.post('/callback', async (req, res) => {

    try {
        const { hmac } = req.query
        const { id, success, payment_key_claims } = req.body.obj

        const paymentToken = await getPaymobToken()

        if (success == true && (await getHMACByOrderId(paymentToken, id)) == hmac) {

            const data = JSON.parse(payment_key_claims.billing_data.extra_description)

            if (data.method_type == 'document') {

                const object = new doc_model({
                    user_id: data.user_id,
                    country: data.country,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    address: data.address,
                    doc_type: data.doc_type,
                    cultural_supplement: data.cultural_supplement == 1,
                    embassy: data.embassy == 1,
                    egyptian_foreign_ministry: data.egyptian_foreign_ministry == 1,
                })
                await object.save()
            }
            else if (data.method_type == 'cv_search_plan') {

                const type = await cv_search_types_model.findById(data.type_id)
                if (type)
                    user_model.updateOne({ _id: data.user_id }, { search_type_id: type._id, search_type_end: new Date().getTime() + (parseInt(type._doc.duration) * 86400000) }).exec()

            }
            else if (data.method_type == 'booking_trip') {

                const lastBook = await trip_booking.findOne({}, {}, { sort: { 'booking_number': -1 }, 'select': 'booking_number' }).exec()

                const object = new trip_booking({
                    booking_number: lastBook ? lastBook.booking_number + 1 : 1000000,
                    payment_id: id,
                    user_id: data.user.id,
                    trip_id: data.trip_id,
                    start_booking_date: data.start_booking_date,
                    start_trip_date: data.start_trip_date,
                    number_of_persons: data.number_of_persons,
                    notes: data.notes,
                    total_paid : data.total_paid,
                })
                const book = await object.save()

                if (book) {

                    const user = await user_model.findById(json.user_id).select('fcmToken language name')

                    if (user && user._doc.notification && user._doc.fcmToken) {
                        sendNotification(
                            user._doc.fcmToken,
                            user._doc.language == 'ar' ? 'تم حجز الرحلة' : 'The Trip has been booked',
                            user._doc.language == 'ar' ? `تم حجز الرحلة برقم ${json.booking_number}` : `The Trip was booked with the number ${json.booking_number}`,
                        )
                    }

                    const company = await company_model.findById(json.company_id).select('fcmToken language')

                    if (company && company._doc.fcmToken) {
                        const companyMessageAR = `
                        تم حجز رحلة ${json.trip_id} \n
                        رقم الحجز ${json.booking_number} \n
                        اجمالي المدفوع ${json.total_paid} \n
                        عدد الافراد ${json.number_of_persons} \n
                        من المستخدم ${user._doc.first_name} ${user._doc.last_name} \n`

                        const companyMessageEN = `Trip booked ${json.trip_id} \n
                        Booking number ${json.trip_number} \n
                        Total paid ${json.total_paid} \n
                        Number of individuals ${json.number_of_persons} \n
                        From user ${user._doc.first_name} ${user._doc.last_name} \n`

                        sendNotification(
                            company._doc.fcmToken,
                            company._doc.language == 'ar' ? 'تم حجز رحلة' : 'Trip has been booked',
                            company._doc.language == 'ar' ? companyMessageAR : companyMessageEN,
                        )

                        const notifcationObject = new notification_model({
                            user_id: company.id,
                            title_ar: 'تم حجز رحلة',
                            title_en: 'Trip has been booked',
                            body_ar: companyMessageAR,
                            body_en: companyMessageEN,
                        }
                        )
                        await notifcationObject.save()
                    }
                }
            }
        }
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).json({
            'stauts': false,
            'data': 'Erro',
        })
    }
})

router.get('/callback', async (req, res) => {


    try {

        const { hmac, id } = req.query

        if (!hmac || !id || req.query.success == 'false') {
            return res.redirect(serverURL + `paymentstatus?status=false`)
        }

        const paymentToken = await getPaymobToken()

        const realHmac = await getHMACByOrderId(paymentToken, id)
        
        const isValid = realHmac == hmac
        res.redirect(serverURL + `paymentstatus?status=${isValid}`)

    } catch (e) {
        console.log(e)
        res.status(500).json({
            'stauts': false,
            'data': 'Error',
        })
    }
})
module.exports = router