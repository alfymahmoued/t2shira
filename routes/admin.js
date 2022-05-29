const router = require('express').Router()
const specialty_model = require('../models/specialty_model')
const cv_model = require('../models/cv_model')
const vis_model = require('../models/visa_model')
const doc_type_model = require('../models/doc_type_model')
const doc_model = require('../models/doc_model')
const cv_search_types_model = require('../models/cv_search_types_model')
const { verifyTokenAndAdmin, verifyToken, sendNotification } = require('../helper')
const banner_model = require('../models/banner_model')
const notification_model = require('../models/notification_model')
const user_model = require('../models/user_model')
const fs = require('fs');
const cv_search_types_users_model = require('../models/cv_search_types_users_model')
const country_model = require('../models/country_model')

router.post('/specialties', verifyToken, async (req, res) => {

    try {


        const specialtyObject = new specialty_model(req.body)

        const result = await specialtyObject.save()

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

router.put('/specialties', verifyToken, async (req, res) => {

    try {


        const { language } = req.headers

        if (req.body.id) {

            const result = await specialty_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي التخصص' : 'The specialty was not found'
            })

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


router.delete('/specialties/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await specialty_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي التخصص' : 'The specialty was not found'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/searchTypesUsers/:page', verifyToken, async (req, res) => {

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
        res.json({
            'status': false,
            'data': e
        })
    }
})
router.get('/cv', verifyToken, async (req, res) => {

    try {

        const result = await cv_model.find({})

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

router.put('/cv', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await cv_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي السيرة الذاتية.' : 'CV not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/cv/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await cv_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي السيرة الذاتية.' : 'CV not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


router.get('/visas', verifyToken, async (req, res) => {

    try {

        const result = await vis_model.find({})

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

router.put('/visa', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        delete req.body.user_id

        const result = await vis_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي التأشيرة.' : 'Visa not Exist.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/visa/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await vis_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي التأشيرة.' : 'Visa not Exist.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

///////////////// doc types /////////////////////


router.post('/docTypes', verifyToken, async (req, res) => {

    try {


        const object = new doc_type_model(req.body)

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

router.put('/docTypes', verifyToken, async (req, res) => {

    try {


        const { language } = req.headers

        if (req.body.id) {

            const result = await doc_type_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي نوع المستند' : 'The document type was not found'
            })

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


router.delete('/docTypes/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await doc_type_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي نوع المستند' : 'The document type was not found'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


///////////////// documentation /////////////////////

router.get('/docs', verifyToken, async (req, res) => {

    try {


        const result = await doc_model.find({})

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

router.put('/doc', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        delete req.body.user_id

        const result = await doc_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي طلب التوثيق.' : 'The documentation request was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/doc/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await doc_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي طلب التوثيق.' : 'The documentation request was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})


///////////////// Cvs Search Plans /////////////////////

router.post('/cvSearchType', verifyToken, async (req, res) => {

    try {

        const object = new cv_search_types_model(req.body)

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

router.put('/cvSearchType', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await cv_search_types_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي نوع الاشتراك.' : 'The subscription type was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/cvSearchType/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await cv_search_types_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي نوع الاشتراك.' : 'The subscription type was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

///////////////// Banners /////////////////////

router.post('/banners', verifyToken, async (req, res) => {

    try {

        const object = new banner_model(req.body)

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

router.put('/banners', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await banner_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي البنر.' : 'The Banner was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.delete('/banners/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await banner_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي البنر.' : 'The Banner was not found.'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})

///////////////// Notifications /////////////////////

router.post('/notifications', verifyToken, async (req, res) => {

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
                res.json({
                    'status': false,
                    'data': language == 'ar' ? 'هذا المستخدم غير موجود' : 'The user not Exist'
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

///////////////// CONDITOONS /////////////////////

router.post('/conditions', verifyToken, async (req, res) => {

    try {

        if (req.body.data) {

            fs.writeFileSync(__dirname + '/../conditions.txt', req.body.data)

            res.json({
                'status': true,
                'data': req.body.data
            })

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


///////////////// countries /////////////////////


router.post('/countries', verifyToken, async (req, res) => {

    try {


        const object = new country_model(req.body)

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

router.put('/countries', verifyToken, async (req, res) => {

    try {


        const { language } = req.headers

        if (req.body.id) {

            const result = await country_model.findOneAndUpdate({ _id: req.body.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي نوع الدولة' : 'The Country type was not found'
            })

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


router.delete('/countries/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const result = await country_model.findOneAndDelete({ _id: req.params.id })

        res.json({
            'status': result ? true : false,
            'data': result ? result : language == 'ar' ? 'لم يتم العثور علي نوع الدولة' : 'The Country type was not found'
        })

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})
module.exports = router