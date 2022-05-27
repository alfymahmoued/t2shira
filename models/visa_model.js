const mongoose = require('mongoose')


const visaSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    sponsor_number: { type: String, required: true },
    number_issued: { type: String, required: true },
    occupation_required: { type: String, required: true },
    arrival: { type: String, required: true },
    sex: { type: String, required: true },
    number_of_visas: { type: Number, required: true },
    country: { type: String, required: true },
    doc_url: { type: String, required: true },

}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("visas", visaSchema);