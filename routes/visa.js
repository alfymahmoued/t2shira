const router = require('express').Router()
const vis_model = require('../models/visa_model')
const { verifyToken } = require('../helper')


router.get('/', verifyToken, async (req, res) => {

    try {

        const result = await vis_model.find({ user_id: req.user.id })

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

router.post('/', verifyToken, async (req, res) => {

    try {

        req.body.user_id = req.user.id

        const visObject = new vis_model(req.body)
        const result = await visObject.save()

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

/*
router.put('/', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        if (req.body.id) {

            delete req.body.user_id

            const result = await vis_model.findOneAndUpdate({ _id: req.body.id, user_id: req.user.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي التأشيرة.' : 'Visa not Exist.'
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
})*/


module.exports = router