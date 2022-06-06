const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    uid: { type: String, required: true },
    provider: { type: String, required: true },
    email: { type: String, required: true },
    first_name: { type: String, default: '' },
    last_name: { type: String, default: '' },
    date_of_birth: { type: String, default: '' },
    notification: { type: Boolean, default: true },
    picture: { type: String, default: '' },
    fcmToken: { type: String },
    language: { type: String, default: 'en' },
    search_type_id: { type: String },
    search_type_end: { type: Number },
    blocked: { type: Boolean, default: false },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("users", userSchema);