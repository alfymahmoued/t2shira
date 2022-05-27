const mongoose = require('mongoose')


const tripSchema = new mongoose.Schema({
    title_ar: { type: String, required: true },
    title_en: { type: String, required: true },
    brief_ar: { type: String, required: true },
    brief_en: { type: String, required: true },
    duration: { type: Number, required: true },
    price_per_person: { type: Number, required: true },
    pictures: { type: Array, required: true },
    itineraries: { type: Array, required: true },
    company_id: { type: String, required: true },

    start_booking_date: { type: Number, required: true },
    end_booking_date: { type: Number, required: true },

    rating: { type: Number, default: 5.0 },
    accepted: { type: Boolean, default: false },

}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("trips", tripSchema);