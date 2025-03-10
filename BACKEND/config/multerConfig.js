import multer from 'multer';
import cloudinaryStorage from 'multer-storage-cloudinary';
import { cloudinary } from './cloudinaryConfig';

const storage = new cloudinaryStorage({
    cloudinary,
    params:{
        folder: "campusMart",
        allowed_formats: ['jpg', 'png' ]        
    }
})

const upload = multer({storage});

export {upload};