const Complaint = require("../models/complaintModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("../utils/cloudinary");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// Create Complaint
exports.createComplaint = catchAsyncError(async (req, res, next) => {
  const {
    title,
    mostRelevant,
    additionalNotes,
    buildingNameOrFlatNo,
    buildingOrStreetNo,
    streetName,
    postcode,
    contact,
    identity,
    furtherNotes,
    permissions
  } = req.body;

  let pictureUrl = "";
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "complaints"
    });
    pictureUrl = result.secure_url;
  }

  const complaint = await Complaint.create({
    title,
    mostRelevant,
    additionalNotes,
    picture: pictureUrl,
    buildingNameOrFlatNo,
    buildingOrStreetNo,
    streetName,
    postcode,
    contact,
    identity,
    furtherNotes,
    permissions
  });

  res.status(201).json({ success: true, complaint });
});

// Get All Complaints (Admin Only)
exports.getAllComplaints = catchAsyncError(async (req, res, next) => {
  const complaints = await Complaint.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, complaints });
});

// Update Complaint Status (Admin Only)
exports.updateComplaintStatus = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;

  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    return next(new ErrorHandler("Complaint not found", 404));
  }

  if (!["pending", "in progress", "resolved", "rejected"].includes(status)) {
    return next(new ErrorHandler("Invalid status value", 400));
  }

  complaint.status = status;
  await complaint.save();

  res.status(200).json({ success: true, message: "Status updated", complaint });
});