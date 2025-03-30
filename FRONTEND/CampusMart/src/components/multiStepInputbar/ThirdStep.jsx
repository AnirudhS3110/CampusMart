import React from "react";
import { FileUploader } from "react-drag-drop-files";

export default function StepThree({formData,setFormData})
{
    return(
        <div>
            <h2>Set Description</h2>
            <input type="file"  value={formData.file} onChange={(e)=>setFormData((data)=>({...data,file: e.target.files[0]})) } className="text-[14px]" ></input>
        </div>
    )

}