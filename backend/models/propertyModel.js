const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter property title"],
    },
    desc: {
        type: String,
        required: [true, "Please enter property description"],
    },
    location: {
        type: String,
        required: [true, "Please enter property location"],
    },
    city: {
        type: String,
        required: [true, "Please enter city"],
    },
    beds: {
        type: Number,
        required: true,
    },
    baths: {
        type: Number,
        required: true,
    },
    floors: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tenantType: {
        type: String,
        enum: ["Student", "Professional", "Family", "Any"],
        default: "Any",
    },
    deposit: {
        type: Number,
        required: true,
    },
    currentStatus: {
        type: String,
        enum: ["Available", "Occupied", "Let Agreed"],
        default: "Available",
    },
    epcRating: {
        type: String,
        required: false,
    },
    councilTaxBand: {
        type: String,
        required: false,
    },
    images: [
        {
            public_id: String,
            url: String,
        }
    ],
    map: {
        type: String, 
        required: false,
    },
    availableFrom: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Property", propertySchema);
