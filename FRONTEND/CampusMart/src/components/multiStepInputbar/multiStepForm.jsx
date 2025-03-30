import React, { useState } from "react";
import StepOne from "./firstStep";
import StepTwo from "./secondStep";
import StepThree from "./ThirdStep";
import { Button } from "../ui/button";





export default function MultiStepForm()
{
    const [index,setIndex] = useState(0);
    const [error,setError] = useState("")
    const [formData,setFomData] = useState({
        title:"",
        price:"",
        description:"",
        file:null
    })
    const steps = [<StepOne formData={formData} setFomData={setFomData}/> , <StepTwo formData={formData} setFomData={setFomData}/> , <StepThree formData={formData} setFomData={setFomData}/>]
    function next()
    {
        if(formData.title!=='' && formData.price!=='')
        {
            setIndex((prev)=>prev+1);
        }
        else if(formData.description!=='')
        {
            setIndex((prev)=>prev+1)
        }
        else if(formData.file!==null)
        {
            setIndex((prev)=>prev+1)
        }
        else{
            setError("Enter all the fields")
        }
    }
    return(
        <div className="my-auto">
            <ProgressBar pagenumber={pagenumber}/>
            {steps[index]}
            <Button variant="ghost" onClick={next} >Next</Button>
            {error.length > 0 && <div>{error}</div>}
        </div>
    )
}