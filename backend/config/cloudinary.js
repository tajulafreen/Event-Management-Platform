const cloudinary = require("cloudinary").v2;
const multer = require("multer");
require("dotenv").config();
// const CLOUDINARY_CLOUD_NAME = "dznf57les";
// const CLOUDINARY_API_KEY = "417954382843869";
// const CLOUDINARY_API_SECRET = "JhIz9aJj5ll5JY6OnHyleriqj9g";
// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "Exists ✅" : "Missing ❌",
});

// Multer Config (Store Image in Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage }); // ✅ Properly setup multer

module.exports = { cloudinary, upload }; // ✅ Export multer instance properly
