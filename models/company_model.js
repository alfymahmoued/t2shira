const mongoose = require('mongoose')


const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    business: { type: String, required: true },
    address: { type: String, required: true },
    tax_registration_number: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    fax: { type: String, required: true },
    type: { type: String, required: true },
    owner_name: { type: String, required: true },
    owner_phone: { type: String, required: true },
    owner_email: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    fcmToken: { type: String, default: '' },
    language: { type: String, default: 'en' },

    priority_appearance: { type: Boolean, default: false }, // اولوية الظهور

    picture: { type: String, default: '' },

    accepted: { type: Boolean, default: true },

}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("companies", CompanySchema);