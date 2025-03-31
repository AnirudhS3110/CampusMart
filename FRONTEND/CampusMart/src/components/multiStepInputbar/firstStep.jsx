import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function StepOne({formData,setFormData})
{
    return(
        <div className="w-full h-full  px-[15px] text-white flex flex-col gap-[20px] justify-center">
            <h2 className="text-[24px]  text-cyello md:font-medium">Set Title, Category and Price</h2>
            <input type="text" placeholder="Enter the title" value={formData.title} onChange={(e)=>setFormData(data=>({...data,title: e.target.value})) } className="text-[18px] rounded-[4px] min-h-[35px] py-[6px] bg-white text-gray-700 px-[10px] " ></input>
            <div className="text-[18px] rounded-[4px] min-h-[35px] py-[6px]">
            <Select onValueChange={(value)=>setFormData(data=>({...data,category:value}))}>
                                    <SelectTrigger  className="w-full bg-white text-gray-700 text-[20px] rounded-[4px]">
                                    <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                   <SelectContent >
                                    <SelectItem value="Mobile">
                                        Mobile
                                    </SelectItem>
                                    <SelectItem value="Electronics"> Electronics</SelectItem>
                                    <SelectItem value="Dresses">Dresses</SelectItem>
                                    <SelectItem value="Instruments"> Arts</SelectItem>
                                   </SelectContent>
                                </Select>
                                </div>
            <input type="text" placeholder="Set the price" value={formData.price} onChange={(e)=>setFormData(data=>({...data,price: e.target.value})) } className="text-[18px] rounded-[4px] min-h-[35px] py-[6px] bg-white text-gray-700 px-[10px] "></input>
        </div>
    )

}