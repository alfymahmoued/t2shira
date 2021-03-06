const mongoose = require('mongoose')


const documentsSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    country: { type: String, required: true },
    doc_type: { type: String, required: true },
    cultural_supplement: { type: Boolean, required: true },
    embassy: { type: Boolean, required: true },
    egyptian_foreign_ministry: { type: Boolean, required: true },
    name: { type: String, required: true, },
    phone: { type: String, required: true, },
    email: { type: String, required: true, },
    address: { type: String, required: true, },

}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("documents", documentsSchema);