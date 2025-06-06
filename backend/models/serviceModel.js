const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    subtitle: { type: String, required: true },
    content: { type: String, required: true }
});

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true },
    desc: { type: String, required: true },
    sections: [sectionSchema], 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Service", serviceSchema);
