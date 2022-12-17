const dotenv = require("dotenv");
const cloudinarymodule = require("cloudinary");

dotenv.config();
const cloudinary = cloudinarymodule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
module.exports = cloudinary;
