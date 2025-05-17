const Property = require("../models/propertyModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("../utils/cloudinary");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

// create property
exports.createProperty = catchAsyncError(async (req, res, next) => {
  const files = req.files;
  const imageUploads = [];

  for (const file of files) {
    const result = await uploadToCloudinary(file.buffer);
    imageUploads.push(result); 
  }

  const propertyData = {
    ...req.body,
    images: imageUploads,
  };

  const property = await Property.create(propertyData);

  res.status(201).json({
    success: true,
    property,
  });
});

// Get All Properties
exports.getAllProperties = catchAsyncError(async (req, res, next) => {
  const properties = await Property.find();
  res.status(200).json({
    success: true,
    properties,
  });
});

// Get Single Property
exports.getPropertyById = catchAsyncError(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  res.status(200).json({
    success: true,
    property,
  });
});

// Update Property
exports.updateProperty = catchAsyncError(async (req, res, next) => {
  let property = await Property.findById(req.params.id);
  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }

  property = await Property.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    property,
  });
});

// Delete Property
exports.deleteProperty = catchAsyncError(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  if (!property) {
    return next(new ErrorHandler("Property not found", 404));
  }
  for (const image of property.images) {
    await cloudinary.uploader.destroy(image.public_id);
  }

  await property.remove();

  res.status(200).json({
    success: true,
    message: "Property deleted successfully",
  });
});
