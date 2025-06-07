const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mostRelevant: { type: String, required: true },
  additionalNotes: { type: String },
  picture: { type: String }, // URL from Cloudinary

  buildingNameOrFlatNo: { type: String },
  buildingOrStreetNo: { type: String },
  streetName: { type: String },
  postcode: { type: String },

  contact: {
    title: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    mobileNo: { type: String },
    landlineNo: { type: String },
  },

  identity: {
    type: String,
    enum: ["Tenant", "Landlord", "Other"],
    required: true,
  },
  furtherNotes: { type: String },

  permissions: {
    accessPermission: {
      type: String,
      enum: ["present", "not_present"],
      required: true,
    },
    vulnerableOccupier: { type: Boolean, default: false },
    agreedToTerms: { type: Boolean, required: true },
  },

  status: {
    type: String,
    enum: ["pending", "in progress", "resolved", "rejected"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", complaintSchema);
