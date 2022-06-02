const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    title_ar: { type: String, required: true },
    title_en: { type: String, required: true },
    body_ar: { type: String, required: true },
    body_en: { type: String, required: true },
    type: { type: Number, default: 1 },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("conditions", schema);