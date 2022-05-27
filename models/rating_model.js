const mongoose = require('mongoose')


const ratingSechema = new mongoose.Schema({

    user_id: { type: String, required: true },
    trip_id: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, default: '' },

}, { versionKey: false, timestamps: true, })

module.exports = mongoose.model("rating", ratingSechema);