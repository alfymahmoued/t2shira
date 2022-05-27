const firebaseAdmin = require('firebase-admin')
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")
const multer = require('multer');
const path = require('path');
const { v4: uuidv4, } = require('uuid');

const serverURL = 'http://t2shira.com/'


const encryptText = (text) => {
    return CryptoJS.AES.encrypt(text, process.env.CRYPTO_KEY).toString()
};

const decryptText = (text) => {
    return CryptoJS.AES.decrypt(text, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)
};

const createToken = (id, isAdmin, isCompany) => {

    return jwt.sign(
        {
            id,
            isAdmin,
            isCompany,
            //   'i': new Date().getTime()
        },
        process.env.JWT_KEY,
        { expiresIn: '1000d' },

    )
}

const verifyToken = (req, res, next) => {

    const token = req.headers.token
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) return res.sendStatus(401)
            req.user = user
            next()
        })
    } else {
        return res.status(401)

    }
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            return res.sendStatus(401)
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return res.sendStatus(401)
        }
    })
}

const verifyTokenAndCompany = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isCompany) {
            next()
        } else {
            return res.sendStatus(401)
        }
    })
}

const sendNotification = function (fcmToken, title, body) {

    if (fcmToken && title && body) {
        const payload = {
            "token": fcmToken,
            "notification": {
                "title": title,
                "body": body,
            },
            data: {
                "click_action": "FLUTTER_NOTIFICATION_CLICK",
            }
        }
        firebaseAdmin.messaging().send(payload)
            .then((response) => {
                console.log(response)

            })
            .catch((error) => {

                console.log(error)
            });
    }
}
const sendNotificationToAll = async function (title, body) {

    try {
        if (title && body) {

            const payload = {
                "topic": 'all',
                "notification": {
                    "title": title,
                    "body": body,
                },
                data: {
                    "click_action": "FLUTTER_NOTIFICATION_CLICK",
                }
            }
            await firebaseAdmin.messaging().send(payload)
            return true
        }
    } catch (e) {
        console.log(e)
        return false
    }
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },

    filename: function (req, file, cb) {


        const filePath = 'files/' + file.fieldname + '-' + uuidv4() + uuidv4() + path.extname(file.originalname)
        cb(null, filePath);
        if (!req.paths) req.paths = []
        req.paths.push(serverURL + filePath)
    }
});

const upload = multer({ storage: storage })
module.exports = {
    encryptText, decryptText, createToken, verifyToken, sendNotification,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyTokenAndCompany,
    sendNotificationToAll,
    upload,
    serverURL,
}