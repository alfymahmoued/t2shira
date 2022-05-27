
const mongoose = require('mongoose')


const countriesSchema = new mongoose.Schema({
    name_ar: { type: String, required: true },
    name_en: { type: String, required: true },
    picture: { type: String, required: true },
    lat: { type: Number, default: 0.0 },
    lng: { type: Number, default: 0.0 },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("countries", countriesSchema);