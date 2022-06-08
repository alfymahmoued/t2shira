const router = require('express').Router()

const doc_type_model = require('../models/doc_type_model')
const doc_model = require('../models/doc_model')
const user_model = require('../models/user_model')

const { getPaymobToken, makeOrder, paymentKeys } = require('../payment_helper')

const { verifyToken } = require('../helper')



router.get('/types', async (req, res) => {

    try {

        const result = await doc_type_model.find({})

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

router.get('/', verifyToken, async (req, res) => {

    try {

        const result = await doc_model.find({ user_id: req.user.id })

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
        const { language } = req.headers

        const { doc_type, country, name, email, phone, address } = req.body

        if (!doc_type || !country || !name || !email || !phone || !address) {
            return res.json({
                'status': false,
                'data': 'Bad Request'
            })
        }
        const user = await user_model.findById(req.user.id)

        if (!user) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'لم يتم العثور علي المستخدم.' : 'User not Exist.'
        })

        const docType = await doc_type_model.findById(doc_type)

        if (!docType)
            return res.json({
                'status': false,
                'data': 'Document Type Not Exist'
            })

        var price = 0
        if (req.body.cultural_supplement == '1') {

            price += docType._doc.cultural_supplement_price ?? 0

        }
        if (req.body.embassy == '1') {
            price += docType._doc.embassy_price ?? 0
        }
        if (req.body.egyptian_foreign_ministry == '1') {
            price += docType._doc.egyptian_foreign_ministry_price ?? 0
        }


        if (!user._doc.phone_number) user._doc.phone_number = 'NA'
        if (!user._doc.first_name) user._doc.first_name = 'NA'
        if (!user._doc.last_name) user._doc.last_name = 'NA'
        if (!user._doc.email) user._doc.email = 'NA'

        const paymentToken = await getPaymobToken()
        const orderId = await makeOrder(paymentToken, price * 100)
        const iFrameToken = await paymentKeys(paymentToken, orderId, price * 100, {

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
                'method_type': 'document',
                'user_id': req.user.id,
                'name': name,
                'phone': phone,
                'email': email,
                'address': address,
                'doc_type': doc_type,
                'country': country,
                'cultural_supplement': req.body.cultural_supplement,
                'embassy': req.body.embassy,
                'egyptian_foreign_ministry': req.body.egyptian_foreign_ministry,
            }),
        }
        )

        /*{

            'city': req.user.id,
            'first_name': req.body.doc_type,
            'last_name': req.body.country,
            'email': req.body.cultural_supplement + '_',
            'building': req.body.embassy + '_',
            'floor': req.body.egyptian_foreign_ministry + '_',
            'apartment': 'document',
            'street': "_",
            'phone_number': "_",
            'shipping_method': "_",
            'postal_code': "_",
            'country': "_",
            'state': "_",
        }*/
        res.json({
            'status': true,
            'data': `https://accept.paymob.com/api/acceptance/iframes/373719?payment_token=${iFrameToken}`
        })


    } catch (e) {
        console.log(e)
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})


router.put('/', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        if (req.body.id) {

            delete req.body.user_id

            const result = await doc_model.findOneAndUpdate({ _id: req.body.id, user_id: req.user.id }, req.body, { returnOriginal: false })

            res.json({
                'status': result ? true : false,
                'data': result ? result : language == 'ar' ? 'لم يتم العثور علي طلب التوثيق.' : 'The documentation request was not found.'
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

router.delete('/:id', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers


        const result = await doc_model.findOneAndDelete({ _id: req.params.id, user_id: req.user.id })

        if (!result) return res.status(404).json({
            'status': false,
            'data': result
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

module.exports = router