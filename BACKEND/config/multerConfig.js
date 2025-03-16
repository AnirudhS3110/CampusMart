import multer from 'multer';
import {CloudinaryStorage}  from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinaryConfig.js';

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "campusMart",
        allowed_formats: ['jpg', 'png' ]        
    }
})

const upload = multer({storage});

export {upload};