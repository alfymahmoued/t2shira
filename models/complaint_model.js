const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    user_id: { type: String, required: true },
    phone: { type: String, required: true },
    text: { type: String, required: true },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("complaints", schema);