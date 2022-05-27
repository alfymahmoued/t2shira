const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app);


const mongoose = require('mongoose')
const firebaseAdmin = require("firebase-admin");
const serviceAccount = require(__dirname + "/serviceAccountKey.json");


require("dotenv").config();


mongoose.connect(process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database Connected')

    }).catch((e) => {
        console.error(e)
    });



firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
});


app.use(require('cors')())
app.use(express.static(__dirname + '/public'))


app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/api/', (req, res, next) => {


    next()
    // if (process.env.API_KEY == req.headers.apikey) next()
    // else
    //  res.sendStatus(400)
})


app.use('/api/auth', require('./routes/auth'))
app.use('/api/user', require('./routes/user'))
app.use('/api/cv', require('./routes/cv'))
app.use('/api/visa', require('./routes/visa'))
app.use('/api/doc', require('./routes/doc'))
app.use('/api/upload', require('./routes/upload'))

app.use('/api/trips', require('./routes/trips'))
app.use('/api/trip', require('./routes/trip'))

app.use('/api/banners', require('./routes/banners'))
app.use('/api/payment', require('./routes/payment'))

app.use('/api/admin', require('./routes/admin'))
app.use('/api/company', require('./routes/company'))

server.listen(process.env.PORT || 2222, () => {
    console.log(`Server started on port ${server.address().port} :)`)
});
