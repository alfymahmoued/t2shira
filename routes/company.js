const router = require('express').Router()
const company_model = require('../models/company_model')
const itinerary_model = require('../models/itinerary_model')
const trip_model = require('../models/trip_model')
const hajj_umra_model = require('../models/hajj_umra_model')

const { createToken, verifyTokenAndCompany } = require('../helper')
const trip_booking = require('../models/trip_booking')
const user_model = require('../models/user_model')
const firebaseAdmin = require('firebase-admin')

///////////////// Auth /////////////////////

router.post('/register', async (req, res) => {
    try {
        const { language } = req.headers

        const { idToken, name, business, address, tax_registration_number, phone, location, fax, type, owner_name, owner_phone, owner_email, email, fcmToken } = req.body


        if (idToken && name && business && address && tax_registration_number && phone && location && fax && type && owner_name && owner_phone && owner_email && email) {

            const firebaseUser = await firebaseAdmin.auth().verifyIdToken(idToken)

            if (firebaseUser) {

                const object = new company_model({
                    provider: 'email',
                    name,
                    business,
                    address,
                    tax_registration_number,
                    phone,
                    location,
                    fax,
                    type,
                    owner_name,
                    owner_phone,
                    owner_email,
                    email,
                    //uid: '_',
                    uid: firebaseUser.uid,
                    fcmToken,
                })

                await object.save()

                // result._doc.token = createToken(result._doc._id, false, true)

                res.json(
                    {
                        'status': true,
                        'data': language == 'ar' ? 'تم تسجيل الدخول بنجاح وبانتظار موافقة الادمن' : 'It was successfully logged in and awaiting the approval of the admin'
                    }
                )

            } else {

                res.json({
                    'status': false,
                    'data': language == 'ar' ? 'البريد الالكتروني ليس مسجلا لدينا' : 'Email is not Registed'
                })
            }

        } else {
            res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }
    } catch (e) {
        console.log(e)
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.post('/login', async (req, res) => {
    try {

        const { language } = req.headers

        const { idToken, fcmToken } = req.body

        if (idToken) {

            const firebaseUser = await firebaseAdmin.auth().verifyIdToken(idToken)

            if (firebaseUser) {

                const result = await company_model.findOneAndUpdate({ uid: firebaseUser.uid, accepted: true }, { fcmToken })

                if (result) {

                    result._doc.token = createToken(result._doc._id, false, true)

                    res.json({
                        'status': true,
                        'data': result,
                    })

                } else {
                    res.json({
                        'status': false,
                        'data': language == 'ar' ? '.هذا الحساب ليس مسجلاً لدينا' : 'This Account Not Exist.'
                    })
                }

            } else {
                res.json({
                    'status': false,
                    'data': language == 'ar' ? '.البريد الالكتروني او كلمة السر ليس صحيحا' : 'Email Or Password Invalid.'
                })
            }

        } else {

            res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }
    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/profile', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await company_model.findById(req.user.id)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي المستخدم.' : 'User not Exist.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.put('/profile', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        if (!req.body.id) return res.json({
            'status': false,
            'data': 'Bad Request'
        })

        delete req.body.accepted

        const result = await company_model.findOneAndUpdate({ _id: req.params.id }, req.body, { returnOriginal: false })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي شركة السياحة.' : 'Tourism Company not Exist.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/users/:id', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await user_model.findById(req.params.id)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي المستخدم.' : 'User not Exist.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})
///////////////// Itineraries /////////////////////


router.get('/itineraries', verifyTokenAndCompany, async (req, res) => {

    try {

        const result = await itinerary_model.find({ company_id: req.user.id })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.post('/itinerary', verifyTokenAndCompany, async (req, res) => {

    try {

        req.body.company_id = req.user.id

        const object = new itinerary_model(req.body)
        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


router.put('/itinerary', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        if (req.body.id) {

            delete req.body.company_id

            const result = await itinerary_model.findOneAndUpdate({ _id: req.body.id, company_id: req.user.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي برنامج الرحلة.' : 'The Itinerary was not found.'
            })

        } else {
            res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/itinerary/:id', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await itinerary_model.findOneAndDelete({ _id: req.params.id, company_id: req.user.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي برنامج الرحلة.' : 'The Itinerary was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})



///////////////// Trips /////////////////////


router.get('/trips', verifyTokenAndCompany, async (req, res) => {

    try {

        const result = await trip_model.find({ company_id: req.user.id })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.post('/trip', verifyTokenAndCompany, async (req, res) => {

    try {

        req.body.company_id = req.user.id

        const object = new trip_model(req.body)
        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


router.put('/trip', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        if (req.body.id) {

            delete req.body.company_id

            const result = await trip_model.findOneAndUpdate({ _id: req.body.id, company_id: req.user.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي الرحلة.' : 'The Trip was not found.'
            })

        } else {
            res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/trip/:id', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await trip_model.findOneAndDelete({ _id: req.params.id, company_id: req.user.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي الرحلة.' : 'The Trip was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


///////////////// Hajj  Umra /////////////////////


router.get('/hajj', verifyTokenAndCompany, async (req, res) => {

    try {

        const result = await hajj_umra_model.find({ company_id: req.user.id })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.post('/hajj', verifyTokenAndCompany, async (req, res) => {

    try {

        req.body.company_id = req.user.id

        const object = new hajj_umra_model(req.body)
        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


router.put('/hajj', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        if (req.body.id) {

            delete req.body.company_id

            const result = await hajj_umra_model.findOneAndUpdate({ _id: req.body.id, company_id: req.user.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي رحلة الحج أو العمرة.' : 'The Hajj Or Umra was not found.'
            })

        } else {
            res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/hajj/:id', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await hajj_umra_model.findOneAndDelete({ _id: req.params.id, company_id: req.user.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي رحلة الحج أو العمرة.' : 'The Hajj Or Umra was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


///////////////// Booking Trips /////////////////////


router.get('/bookingTrips/:page', verifyTokenAndCompany, async (req, res) => {

    try {
        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await trip_booking.find({ company_id: req.user.id }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        const usersIds = []
        result.forEach((e) => {
            if (!usersIds.includes(e.user_id)) usersIds.push(e.user_id)
        })

        const users = await user_model.find({ _id: { $in: usersIds } })

        result.forEach(e => {
            for (var i = 0; i < users.length; i++) {
                if (e.user_id == users[i]._id) {
                    e._doc.user = users[i]
                    break
                }
            }
        })
        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/pendingBookingTrips/:page', verifyTokenAndCompany, async (req, res) => {

    try {
        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await trip_booking.find({ company_id: req.user.id, status: false }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.post('/approveBooking', verifyTokenAndCompany, async (req, res) => {

    try {
        if (!req.body.id)
            return res.json({
                'status': false,
                'data': 'Bad Request'
            })

        const result = await trip_booking.findOneAndUpdate({ company_id: req.user.id, status: false }, { status: true }, { returnOriginal: false })

        if (result) {
            const user = await user_model.findById(result._doc.user_id).select('fcmToken language')

            if (user && user._doc.notification && user._doc.fcmToken) {
                sendNotification(
                    user._doc.fcmToken,
                    user._doc.language == 'ar' ? 'تم الموافقة علي حجز الرحلة' : 'The Trip Booking Approved',
                    user._doc.language == 'ar' ? `تم الموافقة علي حجز الرحلة بتاريخ ${result._doc.start_trip_date}` : `The Trip Booking was approved for booking on ${result._doc.start_trip_date}`,
                )
            }
        }

        res.json({
            'status': result ? true : false,
            'data': result
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})
router.put('/bookingTrips', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        if (req.body.id) {

            delete req.body.company_id

            const result = await trip_booking.findOneAndUpdate({ _id: req.body.id, company_id: req.user.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي حجز الرحلة.' : 'The Trip Booking was not found.'
            })

        } else {
            res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/bookingTrips/:id', verifyTokenAndCompany, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await trip_booking.findOneAndDelete({ _id: req.params.id, company_id: req.user.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي حجز الرحلة.' : 'The Trip Booking was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


///////////////// Hajj  Umra /////////////////////
module.exports = router