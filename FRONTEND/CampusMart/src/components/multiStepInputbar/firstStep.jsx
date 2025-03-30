import React from "react";

export default function StepOne({formData,setFormData})
{
    return(
        <div>
            <h2>Set title and Price</h2>
            <input type="text" placeholder="Enter the title" value={formData.title} onChange={(e)=>setFormData((data)=>({...data,title: e.target.value})) } className="text-[14px]" ></input>
            <input type="text" placeholder="Set the price" value={formData.price} onChange={(e)=>setFormData((data)=>({...data,price: e.target.value})) } ></input>
        </div>
    )

}