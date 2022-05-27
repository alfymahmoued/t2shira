const mongoose = require('mongoose')


const bannerSchema = new mongoose.Schema({
    title_ar: { type: String, required: true },
    title_en: { type: String, required: true },
    url: { type: String, required: true },
    picture: { type: String, default: '' },
    type: { type: String, required: true },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("banners", bannerSchema);