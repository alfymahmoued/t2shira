const mongoose = require('mongoose')


const specialtySchema = new mongoose.Schema({
    name_ar: { type: String, required: true },
    name_en: { type: String, required: true },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("specialties", specialtySchema);