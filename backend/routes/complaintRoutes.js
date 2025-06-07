const express = require("express");
const router = express.Router();
const {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus
} = require("../controllers/complaintController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");
const upload = require("../middleware/multer");

router.post("/complaint", upload.single("picture"), createComplaint);
router.get(
  "/complaints",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  getAllComplaints
);
router.put(
  "/complaint/:id/status",
  isAuthenticatedUser,
  authorizeRoles("admin", "superadmin"),
  updateComplaintStatus
);

module.exports = router;