const mongoose = require('mongoose')


const cvSchema = new mongoose.Schema({
    user_id: { type: String, require: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    phone: { type: String, required: true },
    phone_optinal: { type: String, default: '' },
    email: { type: String, required: true },
    city: { type: String, required: true },
    zip_code: { type: String, default: true },
    date_of_birth: { type: String, required: true },
    place_of_birth: { type: String, required: true },
    current_place: { type: String, required: true },
    type_of_id: { type: String, required: true },
    id_number: { type: String, required: true },
    sex: { type: String, required: true },
    social_status: { type: String, required: true },
    country_id: { type: String, required: true },
    pdf_url: { type: String, required: true },
    specialty_id: { type: String, required: true },
    education: { type: Array, default: [] },
    experiences: { type: Array, default: [] },
    jobs: { type: Array, default: [] },
    number: { type: Number, default: 0, },
    
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("cvs", cvSchema);