const mongoose = require('mongoose')


const cvSearchTypesUsersSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    type_id: { type: String, required: true },
    duration: { type: Number, required: true },
    payment_id: { type: String, required: true },
    total: { type: Number, required: true },
    sub_total: { type: Number, required: true },
    coupon: { type: String, default: '' },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("cvs_search_types_users", cvSearchTypesUsersSchema);