const mongoose = require('mongoose')


const docTypeSchema = new mongoose.Schema({
    name_ar: { type: String, required: true },
    name_en: { type: String, required: true },
    cultural_supplement_price: { type: Number, default: 0 },
    embassy_price: { type: Number, default: 0 },
    egyptian_foreign_ministry_price: { type: Number, default: 0 },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("doc_types", docTypeSchema);