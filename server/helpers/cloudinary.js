const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv'); 
dotenv.config({path: './.env'})
const multer = require('multer')
cloudinary.config({
    cloud_name: process.env.PUBLIC_CLOUND_NAME, 
    api_key: process.env.PUBLIC_API_KEY, 
    api_secret: process.env.API_SECRET,
    
    // process.env.CLOUDINARY_URL
})
const storage = new multer.memoryStorage()
async function imageUploadUtil (file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type :'auto'
    })
    return result
}
const upload = multer({storage});
module.exports = {upload, imageUploadUtil}