const multer = require('multer')
const cloudinary = require('cloudinary').v2
require('dotenv').config()


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME && process.env.CLOUD_NAME.trim(),
    api_key: process.env.API_KEY && process.env.API_KEY.trim(),
    api_secret: process.env.API_SECRET && process.env.API_SECRET.trim()
})

const storage = multer.memoryStorage()
const upload = multer({ storage })

module.exports = { upload }
