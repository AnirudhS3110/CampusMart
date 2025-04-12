import React from "react";
import {Plus} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SellButton()
{
    const nav = useNavigate()

    return <div onClick={()=>{nav('/addListing')}} className="md:w-[80px] md:h-[80px] bg-cyello text-white rounded-full flex flex-col justify-center items-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer fixed bottom-[30px] right-[30px] z-50">
    <Plus size={36} />
    {/* <h2 className="text-[15px] font-semibold mt-1 tracking-wide">Sell!</h2> */}
</div>
  
}