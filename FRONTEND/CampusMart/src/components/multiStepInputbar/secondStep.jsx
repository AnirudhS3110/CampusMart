import React from "react";

export default function StepTwo({formData,setFormData})
{
    return(
        <div className="w-full h-full min-w-[300px] min-h-[265px] px-[15px] text-white flex flex-col gap-[20px] justify-center">
            <h2 className="text-[26px] text-cyello">Set Description</h2>
            <textarea maxLength={300} type="text" placeholder="Enter description within 300 characters" value={formData.description} onChange={(e)=>setFormData(data=>({...data,description: e.target.value})) } className="text-[18px] rounded-[4px] min-h-[130px] py-[4px] bg-white text-gray-700 px-[5px] " ></textarea>
        </div>
    )

}