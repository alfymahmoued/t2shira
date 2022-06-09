const router = require('express').Router()
const trip_model = require('../models/trip_model')
const itinerary_model = require('../models/itinerary_model')
const hajj_umra_model = require('../models/hajj_umra_model')
const company_model = require('../models/company_model')
const { verifyToken } = require('../helper')
const rating_model = require('../models/rating_model')
const user_model = require('../models/user_model')

const { getPaymobToken, makeOrder, paymentKeys } = require('../payment_helper')



router.get('/hajj/:page', async (req, res) => {

    try {

        const { most_research } = req.query

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const trips = await hajj_umra_model.find({ isHajj: true, accepted: true }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)


        /// most research

        if (most_research) {
            const companiesIds = []

            trips.forEach(trip => {
                trip._doc.priority_appearance = false
                if (!companiesIds.includes(trip.company_id))
                    companiesIds.push(trip.company_id)
            })

            if (companiesIds.length > 0) {
                const companies = await company_model.find({ _id: { $in: companiesIds } })

                trips.forEach(trip => {
                    for (var i = 0; i < companies.length; i++) {
                        if (trip.company_id == companies[i]._id) {
                            trip._doc.priority_appearance = companies[i].priority_appearance
                            break
                        }
                    }
                })
            }
        }

        ///  most research end

        res.json({
            'status': true,
            'data': trips
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/umra/:page', async (req, res) => {

    try {
        const { most_research } = req.query

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const trips = await hajj_umra_model.find({ isHajj: false, accepted: true }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        /// most research

        if (most_research) {
            const companiesIds = []

            trips.forEach(trip => {
                trip._doc.priority_appearance = false
                if (!companiesIds.includes(trip.company_id))
                    companiesIds.push(trip.company_id)
            })

            if (companiesIds.length > 0) {
                const companies = await company_model.find({ _id: { $in: companiesIds } })

                trips.forEach(trip => {
                    for (var i = 0; i < companies.length; i++) {
                        if (trip.company_id == companies[i]._id) {
                            trip._doc.priority_appearance = companies[i].priority_appearance
                            break
                        }
                    }
                })
            }
        }

        ///  most research end

        res.json({
            'status': true,
            'data': trips
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.post('/search', async (req, res) => {

    try {

        const { data } = req.body

        if (!data)
            res.json({
                'status': false,
                'data': 'Bad Request'
            })

        else {

            const trips = await trip_model.find(
                {
                    'accepted': true,
                    $or: [
                        { title_ar: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { title_en: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { brief_ar: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { brief_en: { $regex: '.*' + data + '.*', $options: 'i' } },
                    ]
                }).limit(20)

            if (trips.length > 0) {

                const itineraries = []

                trips.forEach(trip => {
                    itineraries.push(...trip.itineraries)
                })


                if (itineraries.length > 0) {

                    const itinerariesData = await itinerary_model.find({ _id: { $in: itineraries } })

                    trips.forEach(trip => {
                        const tripItineraries = []

                        trip.itineraries.forEach(itinerary => {
                            for (var i = 0; i < itinerariesData.length; i++) {
                                if (itinerary == itinerariesData[i]._id) {
                                    tripItineraries.push(itinerariesData[i])
                                    break
                                }
                            }
                        })
                        trip._doc.itineraries = tripItineraries
                    })
                }
            }
            const hajj = await hajj_umra_model.find(
                {
                    'accepted': true,
                    $or: [
                        { title_ar: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { title_en: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { desc_ar: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { desc_en: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { itinerary_title_ar: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { itinerary_title_en: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { airline_ar: { $regex: '.*' + data + '.*', $options: 'i' } },
                        { airline_en: { $regex: '.*' + data + '.*', $options: 'i' } },
                    ]
                }).limit(20)

            res.json({
                'status': true,
                'data': {

                    'trips': trips,
                    'hajj': hajj,
                }
            })
        }

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/byCompany/:id/:page', async (req, res) => {

    try {


        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--


        const trips = await trip_model.find({ accepted: true, company_id: req.params.id }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        const itineraries = []

        trips.forEach(trip => {
            itineraries.push(...trip.itineraries)
        })


        if (itineraries.length > 0) {

            const itinerariesData = await itinerary_model.find({ _id: { $in: itineraries } })

            trips.forEach(trip => {
                const tripItineraries = []

                trip.itineraries.forEach(itinerary => {
                    for (var i = 0; i < itinerariesData.length; i++) {
                        if (itinerary == itinerariesData[i]._id) {
                            tripItineraries.push(itinerariesData[i])
                            break
                        }
                    }
                })
                trip._doc.itineraries = tripItineraries
            })
        }

        res.json({
            'status': true,
            'data': trips
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/byCountry/:id/:page', async (req, res) => {

    try {

        const companiesId = await itinerary_model.find({ country_id: req.params.id }).distinct('company_id')


        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--


        const trips = await trip_model.find({ accepted: true, company_id: { $in: companiesId } }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        const itineraries = []

        trips.forEach(trip => {
            itineraries.push(...trip.itineraries)
        })


        if (itineraries.length > 0) {

            const itinerariesData = await itinerary_model.find({ _id: { $in: itineraries } })

            trips.forEach(trip => {
                const tripItineraries = []

                trip.itineraries.forEach(itinerary => {
                    for (var i = 0; i < itinerariesData.length; i++) {
                        if (itinerary == itinerariesData[i]._id) {
                            tripItineraries.push(itinerariesData[i])
                            break
                        }
                    }
                })
                trip._doc.itineraries = tripItineraries
            })
        }

        res.json({
            'status': true,
            'data': trips
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/companies/:page', async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const companies = await company_model.find({ accepted: true }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        res.json({
            'status': true,
            'data': companies
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.post('/rating', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        if (!req.body.trip_id || !req.body.rating) return res.json({
            'status': false,
            'data': 'Bad Request'
        })

        const trip = await trip_model.findById(req.body.trip_id)


        if (trip) {

            req.body.user_id = req.user.id

            const rating = await rating_model.findOneAndUpdate({ user_id: req.user.id }, req.body, { upsert: true, setDefaultsOnInsert: true, new: true })

            updateTripRating(req.body.trip_id)

            res.json({
                'status': true,
                'data': rating
            })

        } else {

            res.status(404).json({
                'status': false,
                'data': language == 'ar' ? 'هذه الرحلة غير موجودة' : 'This trip is not Exist'
            })
        }

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/comments/:id/:page', async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const comments = await rating_model.find({ trip_id: req.params.id }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        res.json({
            'status': true,
            'data': comments
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
router.post('/book', verifyToken, async (req, res) => {

    try {
        const { language } = req.headers
        const { trip_id, start_booking_date, start_trip_date, number_of_persons, notes } = req.body

        if (!trip_id || !start_booking_date || !start_trip_date || !number_of_persons) return res.status(500).json({
            'status': false,
            'data': 'Bad Request'
        })

        const user = await user_model.findById(req.user.id)

        if (!user) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'لم يتم العثور علي المستخدم.' : 'User not Exist.'
        })

        const trip = await trip_model.findOne({ _id: req.body.trip_id, accepted: true })

        if (!trip) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'هذه الرحلة غير متاحة' : 'This trips is not available'
        })

        req.body.total_paid = trip._doc.price_per_person * req.body.number_of_persons
        req.body.user_id = req.user.id
        req.body.company_id = trip._doc.company_id
        req.body.status = false

        if (!user._doc.phone_number) user._doc.phone_number = 'NA'
        if (!user._doc.first_name) user._doc.first_name = 'NA'
        if (!user._doc.last_name) user._doc.last_name = 'NA'
        if (!user._doc.email) user._doc.email = 'NA'

        const paymentToken = await getPaymobToken()
        const orderId = await makeOrder(paymentToken, req.body.total_paid * 100)
        const iFrameToken = await paymentKeys(paymentToken, orderId, req.body.total_paid * 100,
            {
                'phone_number': user._doc.phone_number,
                'first_name': user._doc.first_name,
                'last_name': user._doc.last_name,
                'email': user._doc.email,
                'floor': 'NA',
                'city': 'NA',
                'building': 'NA',
                'apartment': 'NA',
                'street': "NA",
                'postal_code': "NA",
                'country': "NA",
                'state': "NA",
                'shipping_method': 'NA',
                'extra_description': JSON.stringify({
                    'method_type': 'booking_trip',
                    'user_id': req.user.id,
                    'trip_id': trip_id,
                    'start_booking_date': start_booking_date,
                    'start_trip_date': start_trip_date,
                    'number_of_persons': number_of_persons,
                    'notes': notes ?? '',
                })
            }
        )

        res.json({
            'status': true,
            'data': `https://accept.paymob.com/api/acceptance/iframes/373719?payment_token=${iFrameToken}`
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
router.get('/:page', async (req, res) => {

    try {

        const { most_research } = req.query

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--


        const trips = await trip_model.find({ accepted: true }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        /// most research

        if (most_research) {
            const companiesIds = []

            trips.forEach(trip => {
                trip._doc.priority_appearance = false
                if (!companiesIds.includes(trip.company_id))
                    companiesIds.push(trip.company_id)
            })

            if (companiesIds.length > 0) {
                const companies = await company_model.find({ _id: { $in: companiesIds } })

                trips.forEach(trip => {
                    for (var i = 0; i < companies.length; i++) {
                        if (trip.company_id == companies[i]._id) {
                            trip._doc.priority_appearance = companies[i].priority_appearance
                            break
                        }
                    }
                })
            }
        }

        ///  most research end

        const itineraries = []

        trips.forEach(trip => {
            itineraries.push(...trip.itineraries)
        })


        if (itineraries.length > 0) {

            const itinerariesData = await itinerary_model.find({ _id: { $in: itineraries } })

            trips.forEach(trip => {
                const tripItineraries = []

                trip.itineraries.forEach(itinerary => {
                    for (var i = 0; i < itinerariesData.length; i++) {
                        if (itinerary == itinerariesData[i]._id) {
                            tripItineraries.push(itinerariesData[i])
                            break
                        }
                    }
                })
                trip._doc.itineraries = tripItineraries
            })
        }

        res.json({
            'status': true,
            'data': trips.length == 0 ? [] : trips.sort((a, b) => Number(b._doc.priority_appearance) - Number(a._doc.priority_appearance))
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
async function updateTripRating(id) {

    var result = await rating_model.aggregate(
        [
            { $match: { trip_id: id } },
            {
                $group:
                {
                    _id: id,
                    rating: { $sum: "$rating" },
                    count: { $sum: 1 }
                }
            }
        ]
    )
    var rating = 5
    if (result.length > 0 && result[0].rating && result[0].count)
        rating = Math.round(result[0].rating / result[0].count)

    return await trip_model.findOneAndUpdate({
        _id: id
    }, { rating: rating }, { returnOriginal: false })
}
module.exports = router