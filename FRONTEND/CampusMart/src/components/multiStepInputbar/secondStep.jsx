import React from "react";

export default function StepTwo({formData,setFormData})
{
    return(
        <div>
            <h2>Set Description</h2>
            <textarea maxLength={300} type="text" placeholder="Enter description within 300 characters" value={formData.description} onChange={(e)=>setFormData((data)=>({...data,description: e.target.value})) } className="text-[14px]" ></textarea>
        </div>
    )

}