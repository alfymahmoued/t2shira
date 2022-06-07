const router = require('express').Router()
const banner_model = require('../models/banner_model')

router.get('/', async (req, res) => {

    try {
        const banners = await banner_model.find({})

        res.json({
            'status': true,
            'data': banners
        })

    } catch (e) {
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
module.exports = router