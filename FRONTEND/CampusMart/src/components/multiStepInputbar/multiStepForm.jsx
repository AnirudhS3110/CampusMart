import React, { useState } from "react";
import StepOne from "./firstStep";
import StepTwo from "./secondStep";
import StepThree from "./ThirdStep";
import { Button } from "../ui/button";
import ProgressBar from "./progressBar";
import { motion } from "framer-motion";





export default function MultiStepForm({formData,setFormData,onClickSend})
{
    const [index,setIndex] = useState(0);
    const [error,setError] = useState("")
    const [isupload,SetisUpload] = useState(false)
    
    const steps = [<StepOne formData={formData} setFormData={setFormData}/> , <StepTwo formData={formData} setFormData={setFormData}/> , <StepThree formData={formData} setFormData={setFormData}/>]
    function next() {
        if (index === 0) { // Step 1 validation
            if (formData.title !== '' && formData.price !== '' && formData.category !== '') {
                setIndex(prev => prev + 1);
                setError("");
            } else {
                setError("Enter all required fields");
            }
        } 
        else if (index === 1) { // Step 2 validation
            if (formData.description && formData.description.trim().length > 0) {
                setIndex(prev => prev + 1);
                setError("");
            } else {
                setError("Description is required");
            }
        } 
        else if (index === 2) { // Step 3 validation (image upload)
            console.log("isUpload:",isupload);
            if (formData.file) {
                SetisUpload(true);
                setError("");
            } else {
                setError("Please upload an image");
            }
            
        }
    }
    
    return(
        <div className="flex flex-row justify-center md:min-h-[450px]">
            <div className="hidden md:flex md:flex-col md:justify-center items-center md:bg-cyello md:border-white md:border-[3px] md:min-h-[450px] md:min-w-[300px] md:border-r-0 md:rounded-l-[10px] gap-[20px] shadow-[0_10px_20px_rgba(0,0,0,0.3)] md:shadow-lg relative">
                <h3 className="text-white font-semibold text-[26px] max-w-[350px] text-center ">Add your Product to the MarketPlace!</h3>
                <div className={`border-[4px] text-[20px] font-semibold  transition-all duration-300 ${index===0 ? "border-white bg-white h-[100px] w-[100px]":"border-white bg-cyello"} rounded-full w-[80px] h-[80px] flex justify-center items-center text-white`}>
                    <div className={index==0 ? "text-cyello" : "text-white"}>Step 1</div>
                </div>
                <div className={`border-[4px] text-[20px] font-semibold transition-all duration-300 ${index===1 ? "border-white bg-white  h-[100px] w-[100px]":"border-white bg-cyello"} rounded-full w-[80px] h-[80px] flex justify-center items-center text-white`}>
                    <div className={index==1 ? "text-cyello" : "text-"}>Step 2</div>
                </div>
                <div className={`border-[4px] text-[20px] font-semibold transition-all duration-300 ${index===2 ? "border-white bg-white h-[100px] w-[100px]":"border-white bg-cyello"} rounded-full w-[80px] h-[80px] flex justify-center items-center text-white`}>
                    <div className={index==2 ? "text-cyello" : "text-white"}>Step 3</div>
                </div>
                
                
            </div>

            <div className="my-auto px-[20px] flex flex-col align-middle justify-center gap-[15px] rounded-[15px] max-w-[400px] min-h-[450px] bg-[#062757] md:min-h-[450px] md:min-w-[450px] md:rounded-l-[0px] md:border-l-0   shadow-[6px_6px_12px rgba(0,0,0,0.5), -6px -6px 12px rgba(255,255,255,0.1)] 
        border-[3px] border-[#0c3b80] ">
                <ProgressBar  index={index} />
                <form onSubmit={onClickSend} className="w-full min-h-[180px] flex gap-[15px]  flex-col justify-center">
                    
                    {steps[index]}
                    
                </form>
                <div className={`w-full flex ${index==2 ? "flex-row" : "flex-row-reverse"}  justify-between px-[20px]`}>
                { index <2 && <motion.div whileTap={{scale:.95}}><Button variant="ghost" onClick={next} className="bg-cyello text-white text-[18px]">Next</Button></motion.div>}
                { index <=2 && index >0 && <Button variant="ghost" onClick={()=>setIndex((prev)=>prev-1)} className="bg-cyello text-white text-[18px] max-w-[50%]">Edit previous</Button>}
                {index == 2 &&   <Button disabled={isupload} type="submit" variant="ghost" className="bg-cyello text-white text-[18px] max-w-[50%] " onClick={onClickSend} >Submit</Button>}
                </div>
                
                
                    
                <div className="text-cyello text-[16px] text-center">{error.length > 0 && <div>{error}</div>}</div>  
            </div>
        </div>
    )
}

