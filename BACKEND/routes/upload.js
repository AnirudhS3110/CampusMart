import express from 'express';
import { Router } from 'express';
import { upload } from '../config/multerConfig.js';

const router = Router()

router.post('/singleupload',upload.single('image'), (req,res)=>{
    if(!req.file)
        return res.json({success:false , message:"File was not uploaded.."})

    return res.json({success:true , url:req.file.path});
})

export default router;