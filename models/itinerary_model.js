const mongoose = require('mongoose')


const itinerarySchema = new mongoose.Schema({
    brief_ar: { type: String, required: true },
    brief_en: { type: String, required: true },

    city: { type: String, required: true },
    place: { type: String, required: true },
    duration: { type: Number, required: true },
    late: { type: Number, required: true },
    long: { type: Number, required: true },
    pictures: { type: Array, required: true },
    company_id: { type: String, required: true },
    country_id: { type: String, required: true },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("itineraries", itinerarySchema);