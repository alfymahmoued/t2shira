const router = require('express').Router()
const user_model = require('../models/user_model')
const { verifyToken } = require('../helper')
const notification_model = require('../models/notification_model')
const chat_model = require('../models/chat_model');
const trip_booking = require('../models/trip_booking');
const trip_model = require('../models/trip_model');
const itinerary_model = require('../models/itinerary_model');
const condition_model = require('../models/condition_model');
const complaint_model = require('../models/complaint_model');

router.get('/profile', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await user_model.findById(req.user.id)

        if (!result) res.status = 404

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

router.get('/profile/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await user_model.findById(req.params.id)

        if (!result) res.status = 404

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

router.put('/profile', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        delete req.body.uid
        delete req.body.provider
        delete req.body.email
        delete req.body.search_type_end
        delete req.body.search_type_id
        delete req.body.blocked
        const result = await user_model.findOneAndUpdate({ _id: req.user.id }, req.body, { returnOriginal: false })

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



router.get('/notifications/:page', verifyToken, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await notification_model.find({ user_id: req.user.id }).skip(pageInNumber * 10).limit(10)


        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/notifications', verifyToken, async (req, res) => {

    try {

        if (req.body.ids) {
            await notification_model.deleteMany({ _id: { $in: req.body.ids }, user_id: req.user.id })
            res.json({
                'status': true,
                'data': 'Success',
            })
        }
        else {
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

router.put('/notifications', verifyToken, async (req, res) => {

    try {

        if (req.body.ids) {
            await notification_model.updateMany({ _id: { $in: req.body.ids }, user_id: req.user.id }, { is_read: true })
            res.json({
                'status': true,
                'data': 'Success',
            })
        }
        else {
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


router.get('/conditions', async (req, res) => {

    try {

        const data = await condition_model.find({ type: 1 })
        res.json({
            'status': true,
            'data': data
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/about-us', async (req, res) => {

    try {

        const data = await condition_model.find({ type: 2 })
        res.json({
            'status': true,
            'data': data
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})
router.get('/common-questions', async (req, res) => {

    try {

        const data = await condition_model.find({ type: 3 })
        res.json({
            'status': true,
            'data': data
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


router.post('/complaint', verifyToken, async (req, res) => {
    try {

        req.body.user_id = req.user.id
        const object = new complaint_model(req.body)
        const result = await object.save()


        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

///////////////// CHAT ////////////////////

router.post('/chat', verifyToken, async (req, res) => {

    try {

        req.body.user_id = req.user.id

        const object = new chat_model(req.body)

        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        console.log(e)
        res.json({
            'status': false,
            'data': e
        })
    }

})


router.delete('/chat/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await chat_model.findOneAndDelete({ _id: req.params.id, user_id: req.user.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي الرسالة.' : 'The Message was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/chat/:page', verifyToken, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await chat_model.find({ user_id: req.user.id }).sort({ createdAt: -1 }).skip(pageInNumber * 20).limit(20)


        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})
///////////////// MY TRIPS ////////////////////

router.get('/trips/:page', verifyToken, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const myTrips = await trip_booking.find({ user_id: req.user.id }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)


        if (myTrips) {

            const trips = await trip_model.find({ _id: { $in: myTrips.map(e => e._doc.trip_id) } })

            const itineraries = []

            trips.forEach(trip => {
                itineraries.push(...trip.itineraries)
            })


            if (itineraries.length > 0) {

                const itinerariesData = await itinerary_model.find({ _id: { $in: itineraries } })

                trips.forEach(trip => {
                    const tripItineraries = []

                    trip._doc.itineraries.forEach(itinerary => {
                        for (var i = 0; i < itinerariesData.length; i++) {
                            if (itinerary == itinerariesData[i]._id) {
                                tripItineraries.push(itinerariesData[i])
                                break
                            }
                        }
                    })
                    for (var i = 0; i < myTrips.length; i++) {
                        if (myTrips[i].trip_id == trip._id) {
                            trip._doc.itineraries = tripItineraries
                            myTrips[i]._doc.trip = trip
                        }
                    }

                    //trip._doc.itineraries = tripItineraries
                })


            }
        }
        res.json({
            'status': true,
            'data': myTrips,
        })

    } catch (e) {
        console.log(e)
        res.json({
            'status': false,
            'data': e
        })
    }
})


module.exports = router