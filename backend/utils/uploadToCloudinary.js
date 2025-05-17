const cloudinary = require("./cloudinary");
const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });
const uploadToCloudinary = async (fileBuffer, folder = "properties") => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: "image", folder },
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        ).end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;
