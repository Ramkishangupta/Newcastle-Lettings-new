const express = require("express");
const router = express.Router();
const {
    createService,
    getAllServices,
    getService,
    updateService,
    deleteService
} = require("../controllers/serviceController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");

// Only admin/superadmin can create, update, delete
router.post("/service", isAuthenticatedUser, authorizeRoles("admin", "superadmin"), createService);
router.put("/service/:id", isAuthenticatedUser, authorizeRoles("admin", "superadmin"), updateService);
router.delete("/service/:id", isAuthenticatedUser, authorizeRoles("admin", "superadmin"), deleteService);

// User access
router.get("/services", getAllServices);
router.get("/service/:id", getService);

module.exports = router;
