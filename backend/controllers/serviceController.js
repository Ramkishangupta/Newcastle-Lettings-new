const Service = require("../models/serviceModel");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");

// Create a service
exports.createService = catchAsyncError(async (req, res, next) => {
    const { serviceName, desc, sections } = req.body;

    const service = await Service.create({ serviceName, desc, sections });
    res.status(201).json({ success: true, service });
});

// Get all services
exports.getAllServices = catchAsyncError(async (req, res, next) => {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, services });
});

// Get single service by ID
exports.getService = catchAsyncError(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    if (!service) return next(new ErrorHandler("Service not found", 404));

    res.status(200).json({ success: true, service });
});

// Update service
exports.updateService = catchAsyncError(async (req, res, next) => {
    let service = await Service.findById(req.params.id);
    if (!service) return next(new ErrorHandler("Service not found", 404));

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({ success: true, service });
});

// Delete service
exports.deleteService = catchAsyncError(async (req, res, next) => {
    const service = await Service.findById(req.params.id);
    if (!service) return next(new ErrorHandler("Service not found", 404));

    await service.deleteOne();
    res.status(200).json({ success: true, message: "Service deleted successfully" });
});
