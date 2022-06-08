const router = require('express').Router()
const firebaseAdmin = require('firebase-admin')
const user_model = require('../models/user_model')
const { createToken } = require('../helper')


router.post('/register', async (req, res) => {
    try {
        const { language } = req.headers

        console.log(req.body)
        const { idToken, email, notification, fcmToken, phone_number } = req.body

        if (idToken && email) {

            const firebaseUser = await firebaseAdmin.auth().verifyIdToken(idToken)

            if (firebaseUser) {

                const userObject = new user_model({
                    provider: 'email',
                    first_name: req.body.first_name ?? '',
                    last_name: req.body.last_name ?? '',
                    date_of_birth: req.body.date_of_birth ?? '',
                    email: email,
                    notification: notification ?? false,
                    uid: firebaseUser.uid,
                    fcmToken: fcmToken ?? '',
                    phone_number,
                })

                const result = await userObject.save()

                delete result._doc.updatedAt
                delete result._doc.createdAt
                delete result._doc.uid

                result._doc.token = createToken(result._doc._id, false, false)

                res.json(
                    {
                        'status': true,
                        'data': result
                    }
                )

            } else {

                res.status(404).json({
                    'status': false,
                    'data': language == 'ar' ? 'البريد الالكتروني ليس مسجلا لدينا' : 'Email is not Registed'
                })
            }

        } else {
            res.status(500).json({
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

router.post('/login', async (req, res) => {
    try {

        const { language } = req.headers

        const { idToken, fcmToken } = req.body

        if (idToken) {

            const firebaseUser = await firebaseAdmin.auth().verifyIdToken(idToken)

            if (firebaseUser) {

                const result = await user_model.findOneAndUpdate({ uid: firebaseUser.uid }, { fcmToken })

                if (result) {

                    if (result._doc.blocked == true) {
                        res.status = 500
                        return res.json({
                            'status': false,
                            'data': language == 'ar' ? '.هذا الحساب محظور' : 'This Account is Blocked.',
                        })
                    }
                    result._doc.token = createToken(result._doc._id, false, false)

                    res.json({
                        'status': true,
                        'data': result,
                    })

                } else {
                    res.status(404).json({
                        'status': false,
                        'data': language == 'ar' ? '.هذا الحساب ليس مسجلاً لدينا' : 'This Account Not Exist.'
                    })
                }

            } else {
                res.status(404).json({
                    'status': false,
                    'data': language == 'ar' ? '.البريد الالكتروني او كلمة السر ليس صحيحا' : 'Email Or Password Invalid.'
                })
            }

        } else {
            res.status(500).json({
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

// soical
router.post('/social', async (req, res) => {
    try {
        const { language } = req.headers

        const { idToken, fcmToken } = req.body

        if (idToken) {

            const firebaseUser = await firebaseAdmin.auth().verifyIdToken(idToken)

            const provider = firebaseUser.firebase.sign_in_provider

            if (firebaseUser) {

                const result = await user_model.findOneAndUpdate({ uid: firebaseUser.uid, provider }, { fcmToken })

                if (result) {

                    if (result._doc.blocked == true) {

                        return res.status(500).json({
                            'status': false,
                            'data': language == 'ar' ? '.هذا الحساب محظور' : 'This Account is Blocked.',
                        })
                    }

                    result._doc.token = createToken(result._doc._id, false, false)

                    res.json(
                        {
                            'status': true,
                            'data': result
                        }
                    )

                } else {

                    const userObject = new user_model({
                        uid: firebaseUser.uid ?? '',
                        first_name: firebaseUser.name ?? '',
                        last_name: '',
                        date_of_birth: '',
                        email: firebaseUser.email ?? '',
                        picture: firebaseUser.picture ?? '',
                        provider,
                        fcmToken,
                    })
                    const result = await userObject.save()

                    result._doc.token = createToken(result._doc._id, false, false)

                    res.json({
                        'result': true,
                        'data': result,
                    })
                }

            } else {
                res.status(500).json({
                    'status': false,
                    'data': language == 'ar' ? 'فشل تسجيل الدخول حاول مرة أخري.' : 'Login failed, try again.'
                })
            }

        } else {

            res.status(500).json({
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

module.exports = router