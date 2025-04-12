import express from 'express';
import { Router } from 'express';
import { upload } from '../config/multerConfig.js';
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

import uploadQueue from '../queues/uploadQueue.js';

const router = Router()

router.post('/singleupload',upload.single('image'), async(req,res)=>{
    if(!req.file)
        return res.json({success:false , message:"File was not uploaded.."})

    const job = await uploadQueue.add('upload-to-cloudinary',{
        fileBuffer:req.file.buffer.toString('base64'),
        originalname:req.file.originalname,
        mimetype:req.file.mimetype,
    })



    return res.json({success:true , jobID:job.id});
})

router.post('/geturl',async(req,res)=>{
    const id = req.body.jobID;
    const job = await uploadQueue.getJob(id);

    if (!job) {
        return res.status(404).json({ success: false, message: "Job not found" });
      }

    const state = await job.getState();
    if(state === 'completed')
    {
        const result = await job.returnvalue;
        return res.json({ 
            success: true, 
            status: 'completed',
            url: result.secure_url || null
          });
    }
    else if (state === 'failed') 
    {
        return res.json({ 
          success: false, 
          status: 'failed',
          message: "Upload failed"
        });
    } 
    else 
    {
        return res.json({ 
          success: true, 
          status: state
        });
    }
})

router.post('/editupload',upload.single('image'),async(req,res)=>{
    const{publicID,newPath} = req.body;
    try{
        const uploadedObj = await cloudinary.uploader.upload(newPath,
            {
                public_id:publicID,
                overwrite:true,
                invalidate:true,
                cache: false
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