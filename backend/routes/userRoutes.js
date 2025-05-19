const express = require("express");
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
    updateUserRole,
    forgotPassword,
    resetPassword,
    getAllUsers
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/Auth");

//route to login and register a user
router.post("/register", registerUser);
router.post("/login", loginUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.get("/logout", logoutUser);

// Route to promote user to admin (only superadmin)
router.put("/admin/user/:id", isAuthenticatedUser, authorizeRoles("superadmin"), updateUserRole);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("superadmin"),getAllUsers);
// Reset password
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

module.exports = router;
