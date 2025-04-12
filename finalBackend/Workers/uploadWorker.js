import { Worker } from "bullmq"
import cloudinary from "../config/cloudinaryConfig.js"
import uploadQueue from "../queues/uploadQueue.js"

const connection = {
    host: 'localhost',
    port: 6379
}

const uploadWorker = new Worker('uploadQueue',async job=>{
  console.log("Entrerd the worer!, job")
    try
    {
      const {fileBuffer,originalname,mimetype} = job.data;
      const  buffer = Buffer.from(fileBuffer,'base64');
      const jobResult = await new Promise((resolve,reject)=>{
        console.log("GOnna upload to cloudinary!");
          const uploadStream =cloudinary.uploader.upload_stream(
            {
                folder: 'campusMart', 
                resource_type: 'auto', 
                public_id: originalname, 
            },
              (error,result)=>
              {
                if(error)
                {   
                  reject(error);
                  throw error;  
                }
                else
                {
                  console.log("Result came form cloudinary!, the result: ", result);
                  resolve(result);
                }
              })
        uploadStream.end(buffer); 
    })
    return jobResult   
  } 
  catch(e)
  {
    console.error("Worker Error:", e);
    throw e;
  }
},{connection})


uploadWorker.on('completed', (job, returnvalue) => {
    console.log(`Job ${job.id} completed. Cloudinary URL: ${returnvalue.secure_url}`);
  });
  
uploadWorker.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed. Error: ${err.message}`);
  });

  export default uploadWorker;