const router = require('express').Router()
const specialty_model = require('../models/specialty_model')
const cv_model = require('../models/cv_model')
const cv_search_types_model = require('../models/cv_search_types_model')
const { v4: uuidv4, } = require('uuid');
const { getPaymobToken, makeOrder, paymentKeys } = require('../payment_helper')
const { verifyToken, serverURL } = require('../helper')
const fs = require("fs");
const html = fs.readFileSync("./cv_template.html", "utf8");
const handlebars = require('handlebars')
const user_model = require('../models/user_model')
const country_model = require('../models/country_model')

router.get('/searchTypes', async (req, res) => {

    try {

        const result = await cv_search_types_model.find({})

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

router.post('/addSearchType', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        if (!req.body.type_id) return res.json({
            'status': false,
            'data': 'Bad Request'
        })

        const type = await cv_search_types_model.findById(req.body.type_id)

        if (type) {

            const existUser = await user_model.findById(req.user.id)

            if (!existUser) {
                return res.json({
                    'status': false,
                    'data': language == 'ar' ? 'هذا الحساب غير موجود لدينا' : 'This account we don\'t have.'
                })
            }

            const paymentToken = await getPaymobToken()
            const orderId = await makeOrder(paymentToken, type._doc.cost * 100)
            const iFrameToken = await paymentKeys(paymentToken, orderId, type._doc.cost * 100, {

                'city': existUser.id,
                'first_name': existUser._doc.first_name,
                'last_name': existUser._doc.last_name,
                'email': existUser._doc.email,
                'apartment': 'cv_search_plan',
                'building': req.body.type_id,
                'floor': type._doc.duration,
                'street': "_",
                'phone_number': "_",
                'shipping_method': "_",
                'postal_code': "_",
                'country': "_",
                'state': "_",
            }
            )

            res.json({
                'status': true,
                'data': `https://accept.paymob.com/api/acceptance/iframes/373719?payment_token=${iFrameToken}`
            })

        } else {
            res.json({
                'status': false,
                'data': language == 'ar' ? 'خطة البحث غير متاحة الان' : 'The search plan is not available right now.'
            })
        }

    } catch (e) {
        res.json({
            'status': false,
            'data': e
        })
    }

})

router.get('/countries', async (req, res) => {

    try {

        const countries = await country_model.find({})
        res.json({
            'status': true,
            'data': countries
        })

    } catch (e) {
        console.log(e)
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/specialties', async (req, res) => {

    try {

        const result = await specialty_model.find({})

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

router.post('/search', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const { country_id, specialty_id } = req.body

        const user = await user_model.findById(req.user.id)

        if (user && (user._doc.search_type_end ?? 0) >= new Date().getTime()) {


            if (!country_id && !specialty_id)
                res.json({
                    'status': false,
                    'data': language == 'ar' ? 'يجب البحث بالدولة او التخصص أو كلاهما.' : 'You must search by country, specialization, or both.'
                })

            else {

                const result = await cv_model.find(
                    {
                        country_id: country_id, specialty_id: specialty_id

                    }).limit(20)

                res.json({
                    'status': result.length > 0 ? true : false,
                    'data': result.length > 0 ? result : language == 'ar' ? 'لم يتم العثور علي متطلباتك.' : 'Your requirements were not found.'
                })
            }

        } else {
            res.json({
                'status': false,
                'data': language == 'ar' ? 'لا يوجد اشتراك لديك بحث او قد يكون منتهي' : 'You don\'t have a subscription to search or it may have expired'
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

router.post('/', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        if (!req.body.specialty_id) return res.status(500).json({
            'status': false,
            'data': 'Bad Request'
        })

        const user = await user_model.findById(req.user.id)

        if (!user) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'الحساب غير موجود' : 'The User is not Exist'
        })

        const specialty = await specialty_model.findById(req.body.specialty_id)

        if (!specialty) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'التخصص غير موجود' : 'The Specialty is not Exist'
        })

        const pdfPath = uuidv4() + uuidv4() + '.html'

        req.body.user_id = req.user.id

        req.body.pdf_url = `${serverURL}files/cvs/${pdfPath}`

        /*req.body.education = [
            {
                "level": 'Level',
                "university": 'University',
                "startDate": '12-12-11',
                "endDate": '12-12-12',
                "certification": 'The Certification',
                "notes": 'The Notes',
            }

        ]

        req.body.experiences = [
            {
                "skill": 'The Skill',
                "notes": 'The Notes',
                "certification": 'The Certification',
            },
            {
                "skill": 'The Skill',
                "notes": 'The Notes',
                "certification": 'The Certification',
            },
            {
                "skill": 'The Skill',
                "notes": 'The Notes',
                "certification": 'The Certification',
            },

        ]
        req.body.jobs = [{
            "startDate": '12-12-11',
            "university": 'place',
            "endDate": '12-12-12',
            "certification": 'Egypt',
            "city": 'Cairo',
            "reason": 'The reason',
        },
        {
            "startDate": '12-12-11',
            "university": 'place',
            "endDate": '12-12-12',
            "certification": 'Egypt',
            "city": 'Cairo',
            "reason": 'The reason',
        }, {
            "startDate": '12-12-11',
            "university": 'place',
            "endDate": '12-12-12',
            "certification": 'Egypt',
            "city": 'Cairo',
            "reason": 'The reason',
        },
        ]*/

        const cvObject = new cv_model(req.body)

        const result = await cvObject.save()



        var template = handlebars.compile(html);

        var data = {
            logo_url: serverURL + '/files/logo.png',
            name: result._doc.name,
            picture: result._doc.picture,
            date_of_birth: result._doc.date_of_birth,
            specialty_id: `${specialty._doc.name_ar} | ${specialty._doc.name_en}`,
            social_status: result._doc.social_status,
            sex: result._doc.sex,
            place_of_birth: result._doc.place_of_birth,
            education: result._doc.education,
            jobs: result._doc.jobs,
            experiences: result._doc.experiences,
            name_field: user._doc.language == 'ar' ? 'الاسم' : 'Name',
            date_of_birth_field: user._doc.language == 'ar' ? 'تاريخ الميلاد' : 'Date of Birth',
            sex_field: user._doc.language == 'ar' ? 'الجنس' : 'Sex',
            place_of_birth_field: user._doc.language == 'ar' ? 'مكان الميلاد' : 'Place Of Birth',
            social_status_field: user._doc.language == 'ar' ? 'الحالة الاجتماعية' : 'Social Status',
            jobs_field: user._doc.language == 'ar' ? 'وظائف' : 'Jobs',
            education_field: user._doc.language == 'ar' ? 'تعليم' : 'Education',
            skills_field: user._doc.language == 'ar' ? 'مهارات' : 'Skills',
        }

        fs.writeFile('./public/files/cvs/' + pdfPath, template(data), function (err) {
            if (err) throw err;
        })

        res.json({
            'status': true,
            'data': result,
        })



    } catch (e) {
        console.log(e)
        res.json({
            'status': false,
            'data': e
        })
    }
})

router.get('/', verifyToken, async (req, res) => {

    try {

        const result = await cv_model.find({ user_id: req.user.id })

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
router.delete('/:id', verifyToken, async (req, res) => {

    try {

        const result = await cv_model.findOneAndDelete({ _id: req.params.id, user_id: req.user.id })

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
module.exports = router