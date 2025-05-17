const User = require("../models/userModel");

const createSuperAdmin = async () => {
    try {
        const existing = await User.findOne({ email: process.env.SUPER_ADMIN_EMAIL });
        if (!existing) {
            await User.create({
                name: process.env.SUPER_ADMIN_NAME,
                email: process.env.SUPER_ADMIN_EMAIL,
                password: process.env.SUPER_ADMIN_PASSWORD,
                role: "superadmin"
            });
        } 
    } catch (error) {
    }
};

module.exports = createSuperAdmin;