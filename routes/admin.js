const router = require('express').Router()
const specialty_model = require('../models/specialty_model')
const cv_model = require('../models/cv_model')
const vis_model = require('../models/visa_model')
const doc_type_model = require('../models/doc_type_model')
const doc_model = require('../models/doc_model')
const cv_search_types_model = require('../models/cv_search_types_model')
const { verifyTokenAndAdmin, createToken, sendNotification, sendNotificationToAll } = require('../helper')
const banner_model = require('../models/banner_model')
const notification_model = require('../models/notification_model')
const user_model = require('../models/user_model')
const cv_search_types_users_model = require('../models/cv_search_types_users_model')
const country_model = require('../models/country_model')
const hajj_umra_model = require('../models/hajj_umra_model')
const trip_model = require('../models/trip_model')
const condition_model = require('../models/condition_model')
const complaint_model = require('../models/complaint_model')
const chat_model = require('../models/chat_model')
const trip_booking = require('../models/trip_booking')

router.post('/login', (req, res) => {

    try {
        const { username, password } = req.body

        if (process.env.ADMIN_USERNAME == username && process.env.ADMIN_PASSWORD == password) {

            res.json({
                'token': createToken('admin', true, false)
            })

        } else {
            res.status(500).json({
                'ststus': false,
                'data': 'Error'
            })
        }

    } catch (e) {
        res.status(500).json({
            'ststus': false,
            'data': e
        })
    }

})

router.post('/specialties', verifyTokenAndAdmin, async (req, res) => {

    try {


        const specialtyObject = new specialty_model(req.body)

        const result = await specialtyObject.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/specialties', verifyTokenAndAdmin, async (req, res) => {

    try {


        const { language } = req.headers

        if (req.body.id) {

            const result = await specialty_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

            if (!result) res.status(404)

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ????????????' : 'The specialty was not found'
            })

        } else {
            res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.delete('/specialties/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await specialty_model.findOneAndDelete({ _id: req.params.id })

        if (!result) res.status(404)


        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ????????????' : 'The specialty was not found'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/searchTypesUsers/:page', verifyTokenAndAdmin, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const data = await cv_search_types_users_model.find().sort({ createdAt: -1 }).skip(pageInNumber * 10)

        res.json({
            'status': true,
            'data': data
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
router.get('/cv/:page', verifyTokenAndAdmin, async (req, res) => {

    try {
        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await cv_model.find({}).sort({ createdAt: -1 }).skip(pageInNumber * 20)

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
router.get('/cvs-count', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await cv_model.findOne({}).count()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
router.get('/cv-by-number/:number', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await cv_model.findOne({ number: req.params.number })

        if (!result) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? '???????????? ?????????????? ?????? ????????????' : 'CV is Not Exist'
        })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/cv', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        if (!req.body.id) return res.status(500).json({
            'status': false,
            'data': 'Bad Request'
        })

        const result = await cv_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ???????????? ??????????????.' : 'CV not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/cv/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await cv_model.findOneAndDelete({ _id: req.params.id })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ???????????? ??????????????.' : 'CV not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.get('/visas', verifyTokenAndAdmin, async (req, res) => {

    try {

        const result = await vis_model.find({})

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/visa', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        delete req.body.user_id

        const result = await vis_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ????????????????.' : 'Visa not Exist.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/visa/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await vis_model.findOneAndDelete({ _id: req.params.id })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ????????????????.' : 'Visa not Exist.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

///////////////// doc types /////////////////////


router.post('/docTypes', verifyTokenAndAdmin, async (req, res) => {

    try {


        const object = new doc_type_model(req.body)

        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/docTypes', verifyTokenAndAdmin, async (req, res) => {

    try {


        const { language } = req.headers

        if (req.body.id) {

            const result = await doc_type_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })
            if (!result) res.status(404)

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ??????????????' : 'The document type was not found'
            })

        } else {
            res.status(500).json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.delete('/docTypes/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await doc_type_model.findOneAndDelete({ _id: req.params.id })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ??????????????' : 'The document type was not found'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


///////////////// documentation /////////////////////

router.get('/docs', verifyTokenAndAdmin, async (req, res) => {

    try {


        const result = await doc_model.find({})

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/doc', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        delete req.body.user_id

        const result = await doc_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ??????????????.' : 'The documentation request was not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/doc/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await doc_model.findOneAndDelete({ _id: req.params.id })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ??????????????.' : 'The documentation request was not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


///////////////// Cvs Search Plans /////////////////////

router.post('/cvSearchType', verifyTokenAndAdmin, async (req, res) => {

    try {

        const object = new cv_search_types_model(req.body)

        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/cvSearchType', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await cv_search_types_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

        if (!result) res.status(404)
        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ????????????????.' : 'The subscription type was not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/cvSearchType/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await cv_search_types_model.findOneAndDelete({ _id: req.params.id })

        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ????????????????.' : 'The subscription type was not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

///////////////// Banners /////////////////////

router.post('/banners', verifyTokenAndAdmin, async (req, res) => {

    try {

        const object = new banner_model(req.body)

        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/banners', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await banner_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ??????????.' : 'The Banner was not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/banners/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await banner_model.findOneAndDelete({ _id: req.params.id })

        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ??????????.' : 'The Banner was not found.'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

///////////////// Notifications /////////////////////

router.post('/notifications', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        if (req.body.user_id && req.body.title_ar && req.body.title_en && req.body.body_ar && req.body.body_en) {

            const user = await user_model.findById(req.body.user_id)

            if (user) {

                if (user._doc.notification == true && user._doc.fcmToken) {

                    sendNotification(
                        user._doc.fcmToken,
                        user._doc.language == 'ar' ? req.body.title_ar : req.body.title_en,
                        user._doc.language == 'ar' ? req.body.body_ar : req.body.body_en,
                    )
                }

                const object = new notification_model(req.body)

                const result = await object.save()

                res.json({
                    'status': true,
                    'data': result
                })

            } else {
                res.status(404).json({
                    'status': false,
                    'data': language == 'ar' ? '?????? ???????????????? ?????? ??????????' : 'The user not Exist'
                })
            }
        } else {
            res.status(500).json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.post('/notifications-all', verifyTokenAndAdmin, async (req, res) => {

    try {
        const { title, text } = req.body

        if (title && text) {

            sendNotificationToAll(
                title,
                text,
            )

            res.json({
                'status': true,
                'data': 'Success'
            })

        } else {
            res.status(400).json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
///////////////// CONDITOONS /////////////////////

router.post('/conditions', verifyTokenAndAdmin, async (req, res) => {

    try {

        const object = new condition_model(req.body)

        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/conditions', verifyTokenAndAdmin, async (req, res) => {

    try {


        const { language } = req.headers

        if (req.body.id) {

            const result = await condition_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

            if (!result) res.status(404)

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ??????????' : 'Theis Condition was not found'
            })

        } else {
            res.status(500).json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.delete('/conditions/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await country_model.findOneAndDelete({ _id: req.params.id })

        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ??????????' : 'Theis Condition was not found'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

///////////////// countries /////////////////////


router.post('/countries', verifyTokenAndAdmin, async (req, res) => {

    try {


        const object = new country_model(req.body)

        const result = await object.save()

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.put('/countries', verifyTokenAndAdmin, async (req, res) => {

    try {


        const { language } = req.headers

        if (req.body.id) {

            const result = await country_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

            if (!result) res.status(404)

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ????????????' : 'The Country type was not found'
            })

        } else {
            res.status(500).json({
                'status': false,
                'data': 'Bad Request'
            })
        }

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.delete('/countries/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await country_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ?????? ????????????' : 'The Country type was not found'
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

///////////////// TRIPS /////////////////////

router.get('/review-trips/:page', verifyTokenAndAdmin, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await trip_model.find({ accepted: false }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/approve-hajj-trip/:id', verifyTokenAndAdmin, async (req, res) => {

    try {


        const result = await hajj_umra_model.findOneAndUpdate({ _id: req.params.id }, { accepted: true }, { returnOriginal: false })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/unApprove-hajj-trip/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const result = await hajj_umra_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/review-hajj-trips/:page', verifyTokenAndAdmin, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const hajj = await hajj_umra_model.find({ accepted: false }).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)

        res.json({
            'status': true,
            'data': hajj
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/approve-trip/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const result = await trip_model.findOneAndUpdate({ _id: req.params.id }, { accepted: true }, { returnOriginal: false })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/unApprove-trip/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const result = await trip_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': true,
            'data': result
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.get('/complaints/:page', verifyTokenAndAdmin, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await complaint_model.find({}).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)


        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.delete('/complaints/:id', verifyTokenAndAdmin, async (req, res) => {

    try {


        const result = await complaint_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

//////////////// USERS ////////////////

router.post('/search-users/', verifyTokenAndAdmin, async (req, res) => {

    try {

        const { email, phone_number, first_name, last_name } = req.body

        const result = await user_model.find({
            $or: [
                { email: { $regex: '.*' + email + '.*', $options: 'i' } },
                { phone_number: { $regex: '.*' + phone_number + '.*', $options: 'i' } },
                { first_name: { $regex: '.*' + first_name + '.*', $options: 'i' } },
                { last_name: { $regex: '.*' + last_name + '.*', $options: 'i' } },
            ]
        }).limit(50)


        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/users/:page', verifyTokenAndAdmin, async (req, res) => {

    try {

        var pageInNumber = Number(req.params.page)

        if (!pageInNumber && pageInNumber < 1) pageInNumber = 1
        pageInNumber--

        const result = await user_model.find({}).sort({ createdAt: -1 }).skip(pageInNumber * 10).limit(10)


        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})



router.get('/block-user/:id', verifyTokenAndAdmin, async (req, res) => {

    try {


        const result = await user_model.findOneAndUpdate({ _id: req.params.id }, { blocked: true }, { returnOriginal: false })
        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ????????????????.' : 'User not Exist.'
        })


    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
router.put('/users/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        if (!req.body.id) return res.json({
            'status': false,
            'data': 'Bad Request'
        })


        const result = await user_model.findOneAndUpdate({ _id: req.params.id }, req.body, { returnOriginal: false })

        if (!result) res.status(404)

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? '???? ?????? ???????????? ?????? ????????????????.' : 'User not Exist.'
        })


    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.delete('/users/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const result = await user_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/chat-contacts', verifyTokenAndAdmin, async (req, res) => {

    try {

        const contacts = await chat_model.find({}).select('user_id').distinct('user_id')

        const users = await user_model.find({ _id: { $in: contacts } })

        res.json({
            'status': true,
            'data': users,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/chats/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const result = await chat_model.find({ user_id: req.params.id }).sort({ createdAt: -1 })

        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.post('/chats', verifyTokenAndAdmin, async (req, res) => {

    try {

        req.body.by_user = false
        const object = new chat_model(req.body)

        const result = await object.save()

        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/end-chat/:id', verifyTokenAndAdmin, async (req, res) => {

    try {

        const result = await chat_model.deleteMany({ user_id: req.params.id })

        res.json({
            'status': true,
            'data': result,
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.get('/statistics', verifyTokenAndAdmin, async (req, res) => {

    try {

        const allCvs = await cv_model.find({}).select('_id specialty_id')
        const result = {
            total_user: await user_model.find({}).count(),
            total_cvs: allCvs.length,
            cvs: [],
            docs: await doc_type_model.find({}).count(),
            booking_trip: await trip_booking.find({}).count(),
        }

        for (var i = 0; i < allCvs.length; i++) {
            if (!result.cvs.find(x => x.id == allCvs[i]._doc.specialty_id)) result.cvs.push({ 'id': allCvs[i]._doc.specialty_id, 'count': 0 })
            result.cvs.find(x => x.id == allCvs[i]._doc.specialty_id).count += 1
        }


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
module.exports = router