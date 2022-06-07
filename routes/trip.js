const router = require('express').Router()
const hajj_umra_model = require('../models/hajj_umra_model')
const trip_model = require('../models/trip_model')

router.get('/:id', async (req, res) => {


    try {

        const trip = await trip_model.findOne({ _id: req.params.id, accepted: true })

        if (!trip) res.status = 404
        res.json({
            'status': trip != null,
            'data': trip
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
router.get('/hajj/:id', async (req, res) => {

    try {

        const trip = await hajj_umra_model.findOne({ _id: req.params.id, isHajj: true, accepted: true })

        if (!trip) res.status = 404

        res.status(500).json({
            'status': trip != null,
            'data': trip
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.get('/umra/:id', async (req, res) => {


    try {

        const trip = await hajj_umra_model.findOne({ _id: req.params.id, isHajj: false, accepted: true })

        if (!trip) res.status = 404

        res.json({
            'status': trip != null,
            'data': trip
        })

    } catch (e) {

        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})
module.exports = router