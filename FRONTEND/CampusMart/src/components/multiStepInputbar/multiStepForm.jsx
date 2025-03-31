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
    
    const steps = [<StepOne formData={formData} setFormData={setFormData}/> , <StepTwo formData={formData} setFormData={setFormData}/> , <StepThree formData={formData} setFormData={setFormData}/>]
    function next()
    {
        if(formData.title!=='' && formData.price!=='' && formData.category!=='Select a category')
        {
            setIndex((prev)=>prev+1);
            setError("")
        }
        else if(formData.description!=='')
        {
            setIndex((prev)=>prev+1);
            setError("")
        }
        else if(formData.file!==null)
        {
            setIndex((prev)=>prev+1);
            setError("")
        }
        else{
            setError("Enter all the fields")
        }
    }
    return(
        <div className="flex flex-row justify-center md:min-h-[450px]">
            <div className="hidden md:flex md:flex-col md:justify-center md:bg-cyello md:border-[#0c3b80] md:border-[2px] md:min-h-[450px] md:min-w-[300px] md:border-r-0 md:rounded-l-[10px] ">
                
                
            </div>

            <div className="my-auto px-[20px] flex flex-col align-middle justify-center gap-[15px] rounded-[15px] max-w-[400px] min-h-[450px] bg-[#062757] md:min-h-[450px] md:min-w-[450px] md:rounded-l-[0px] md:border-l-0   shadow-[6px_6px_12px rgba(0,0,0,0.5), -6px -6px 12px rgba(255,255,255,0.1)] 
        border-[3px] border-[#0c3b80]">
                <ProgressBar  index={index} />
                <form onSubmit={onClickSend} className="w-full min-h-[180px] flex gap-[15px]  flex-col justify-center">
                    
                    {steps[index]}
                    
                </form>
                <div className={`w-full flex ${index==2 ? "flex-row" : "flex-row-reverse"}  justify-between px-[20px]`}>
                { index <2 && <motion.div whileTap={{scale:.95}}><Button variant="ghost" onClick={next} className="bg-cyello text-white text-[18px]">Next</Button></motion.div>}
                { index <=2 && index >0 && <Button variant="ghost" onClick={()=>setIndex((prev)=>prev-1)} className="bg-cyello text-white text-[18px] max-w-[50%]">Edit previous</Button>}
                {index == 2 && <Button type="submit" variant="ghost" className="bg-cyello text-white text-[18px] max-w-[50%] " onClick={onClickSend} >Submit</Button>}
                </div>
                
                
                    
                <div className="text-cyello text-[16px] text-center">{error.length > 0 && <div>{error}</div>}</div>  
            </div>
        </div>
    )
}

