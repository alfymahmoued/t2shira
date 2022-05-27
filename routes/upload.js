const router = require('express').Router()
const { verifyToken, upload } = require("../helper")

router.post('/', verifyToken, upload.array('files'), (req, res) => {

    try {

        res.json(
            {
                'status': true,
                'data': req.paths
            }
        )
    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }
})
module.exports = router