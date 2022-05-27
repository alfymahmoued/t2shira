const mongoose = require('mongoose')


const documentsSchema = new mongoose.Schema({

    company_id: { type: String, required: true },

    isHajj: { type: Boolean, required: true },
    pictures: { type: Array, required: true },

    title_ar: { type: String, required: true },
    title_en: { type: String, required: true },

    hotel_ar: { type: String, required: true },
    hotel_en: { type: String, required: true },

    desc_ar: { type: String, required: true },
    desc_en: { type: String, required: true },


    itinerary_title_ar: { type: String, required: true },
    itinerary_title_en: { type: String, required: true },

    start_flight_date: { type: String, required: true },
    end_flight_date: { type: String, required: true },

    airline_ar: { type: String, required: true },
    airline_en: { type: String, required: true },

    means_of_travel_ar: { type: String, required: true },
    means_of_travel_en: { type: String, required: true },

    duration_ar: { type: String, required: true },
    duration_en: { type: String, required: true },

    price: { type: Number, required: true },

    madina_night: { type: Number, required: true },
    mecca_night: { type: Number, required: true },

    price_includes_ar: { type: Array, required: true },
    price_includes_en: { type: Array, required: true },

    price_not_includes_ar: { type: Array, required: true },
    price_not_includes_en: { type: Array, required: true },

    required_documents_ar: { type: Array, required: true },
    required_documents_en: { type: Array, required: true },

    accepted: { type: Boolean, default: true },
    
}, { versionKey: false, timestamps: true, })
module.exports = mongoose.model("hajj_umra", documentsSchema);