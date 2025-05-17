const express = require("express");
const {
    createProperty,
    getAllProperties,
    getPropertyById,
    updateProperty,
    deleteProperty
} = require("../controllers/propertyController");
const upload = require("../middleware/multer");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");


const router = express.Router();

router.route("/properties").post(upload.array("images", 4), createProperty, isAuthenticatedUser, authorizeRoles("superadmin")).get(getAllProperties);
router.route("/properties/:id").get(getPropertyById).put(updateProperty, isAuthenticatedUser, authorizeRoles("admin")).delete(deleteProperty, isAuthenticatedUser, authorizeRoles("admin"));

module.exports = router;
