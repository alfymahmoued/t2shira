const mongoose = require('mongoose')


const notificationSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    is_read: { type: Boolean, default: false },
    title_ar: { type: String, required: true },
    title_en: { type: String, required: true },
    body_ar: { type: String, required: true },
    body_en: { type: String, required: true },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("notifications", notificationSchema);