const mongoose = require('mongoose')


const tripBookingSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    trip_id: { type: String, required: true },
    company_id: { type: String, required: true },
    payment_id: { type: String, required: true },

    start_booking_date: { type: String, required: true },
    start_trip_date: { type: String, required: true },
    number_of_persons: { type: Number, required: true },
    total_paid: { type: Number, required: true },

    booking_number: { type: Number, unique: true },
    
    notes: { type: String, default: '' },
    status: { type: Boolean, default: false },

}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("trip_booking", tripBookingSchema);