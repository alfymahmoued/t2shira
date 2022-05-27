const mongoose = require('mongoose')


const chatSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    text: { type: String, required: true },
    picture: { type: String, default: '' },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("chat", chatSchema);