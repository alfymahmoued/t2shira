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
        res.status(500).json({
            'status': false,
            'data': e
        })
    }
})

router.post('/addSearchType', verifyToken, async (req, res) => {

    try {

        const { language } = req.headers

        const { type_id } = req.body
        if (!type_id) return res.json({
            'status': false,
            'data': 'Bad Request'
        })

        const user = await user_model.findById(req.user.id)

        if (!user) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'لم يتم العثور علي المستخدم.' : 'User not Exist.'
        })

        const type = await cv_search_types_model.findById(req.body.type_id)

        if (!type) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'خطة البحث غير متاحة الان' : 'The search plan is not available right now.'
        })

        if (!user._doc.phone_number) user._doc.phone_number = 'NA'
        if (!user._doc.first_name) user._doc.first_name = 'NA'
        if (!user._doc.last_name) user._doc.last_name = 'NA'
        if (!user._doc.email) user._doc.email = 'NA'

        const paymentToken = await getPaymobToken()
        const orderId = await makeOrder(paymentToken, type._doc.cost * 100)
        const iFrameToken = await paymentKeys(paymentToken, orderId, type._doc.cost * 100,
            {
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
                    'method_type': 'cv_search_plan',
                    'user_id': req.user.id,
                    'type_id': type._id,
                })
            }
        )

        res.json({
            'status': true,
            'data': `https://accept.paymob.com/api/acceptance/iframes/373719?payment_token=${iFrameToken}`
        })



    } catch (e) {
        res.status(500).json({
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
        res.status(500).json({
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
        res.status(500).json({
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
                        $or: [{ country_id }, { specialty_id }]
                    }).limit(20)

                res.json({
                    'status': result.length > 0 ? true : false,
                    'data': result.length > 0 ? result : language == 'ar' ? 'لم يتم العثور علي متطلباتك.' : 'Your requirements were not found.'
                })
            }

        } else {
            res.status(404).json({
                'status': false,
                'data': language == 'ar' ? 'لا يوجد اشتراك لديك بحث او قد يكون منتهي' : 'You don\'t have a subscription to search or it may have expired'
            })

        }

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

        if (!req.body.specialty_id || !req.body.country_id) return res.status(500).json({
            'status': false,
            'data': 'Bad Request'
        })

        const user = await user_model.findById(req.user.id)

        if (!user) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'الحساب غير موجود' : 'The User is not Exist'
        })

        const country = await country_model.findById(req.body.country_id)

        if (!country) return res.status(404).json({
            'status': false,
            'data': language == 'ar' ? 'الدولة غير موجودة' : 'The Country is not Exist'
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

        const lastCV = await cv_model.findOne({}, {}, { sort: { 'number': -1 }, 'select': 'number' }).exec()

        req.body.number = lastCV ? lastCV.number + 1 : 1

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
            bio_field: user._doc.language == 'ar' ? 'المعلومات الحيوية' : 'Bio-Data',
            name_field: user._doc.language == 'ar' ? 'الاسم' : 'Name',
            date_of_birth_field: user._doc.language == 'ar' ? 'تاريخ الميلاد' : 'Date of Birth',
            sex_field: user._doc.language == 'ar' ? 'الجنس' : 'Sex',
            place_of_birth_field: user._doc.language == 'ar' ? 'مكان الميلاد' : 'Place Of Birth',
            social_status_field: user._doc.language == 'ar' ? 'الحالة الاجتماعية' : 'Social Status',
            jobs_field: user._doc.language == 'ar' ? 'وظائف' : 'Jobs',
            education_field: user._doc.language == 'ar' ? 'تعليم' : 'Education',
            skills_field: user._doc.language == 'ar' ? 'مهارات' : 'Skills',
            cv_number_field: user._doc.language == 'ar' ? 'رقم الموظف' : 'Employee No.',
            cv_number: String(result._doc.number),
        }

        fs.writeFile('./public/files/cvs/' + pdfPath, template(data), function (err) { })

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

router.get('/', verifyToken, async (req, res) => {

    try {

        const result = await cv_model.find({ user_id: req.user.id })

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
router.delete('/:id', verifyToken, async (req, res) => {

    try {

        const result = await cv_model.findOneAndDelete({ _id: req.params.id, user_id: req.user.id })

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