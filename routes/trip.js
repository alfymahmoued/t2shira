const router = require('express').Router()
const hajj_umra_model = require('../models/hajj_umra_model')

router.get('/hajj/:id', async (req, res) => {

    try {

        const trip = await hajj_umra_model.findOne({ _id: req.params.id, isHajj: true, accepted: true })

        res.json({
            'status': true,
            'data': trip
        })

    } catch (e) {
       
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/umra/:id', async (req, res) => {


    try {

        const trip = await hajj_umra_model.findOne({ _id: req.params.id, isHajj: false, accepted: true })

        res.json({
            'status': true,
            'data': trip
        })

    } catch (e) {
       
        res.json({
            'status': false,
            'data': e
        })
    }
})
module.exports = router