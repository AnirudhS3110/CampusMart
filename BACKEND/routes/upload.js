import express from 'express';
import { Router } from 'express';
import { upload } from '../config/multerConfig.js';
import {v2 as cloudinary} from 'cloudinary';

const router = Router()

router.post('/singleupload',upload.single('image'), (req,res)=>{
    if(!req.file)
        return res.json({success:false , message:"File was not uploaded.."})

    return res.json({success:true , url:req.file.path});
})

router.post('/editupload',upload.single('image'),async(req,res)=>{
    const{publicID,newPath} = req.body;
    try{
        const uploadedObj = await cloudinary.uploader.upload(newPath,
            {
                public_id:publicID,
                overwrite:true,
                invalidate:true
            }
        
        )

        if(uploadedObj)
        {
            return res.json({success:true,message:"REPLACED successfully!"});
        }
    }
    catch(e)
    {
        return res.status(500).json({success:false, message:"Internal server error while updating the image.."});
    }
})

export default router;