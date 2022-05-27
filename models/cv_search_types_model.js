const mongoose = require('mongoose')


const cvPlanSchema = new mongoose.Schema({
    title_ar: { type: String, required: true },
    title_en: { type: String, required: true },
    duration: { type: Number, required: true },
    cost: { type: Number, required: true },
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("cvs_plans", cvPlanSchema);