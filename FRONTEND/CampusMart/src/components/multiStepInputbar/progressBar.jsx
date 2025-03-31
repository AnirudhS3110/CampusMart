import React from "react";
import { motion } from "framer-motion";

export default function ProgressBar({index})
{
    const percentage = ((index+1)*100)/3;
    return(
        <div className="w-full h-[25px] bg-gray-200 rounded-full shadow-inner relative overflow-hidden md:hidden">
            <motion.div
            style={{ width: `${percentage}%` }}
             className="h-full rounded-full  transition-all duration-300 bg-cyello shadow-md flex items-center justify-center" >
            <span className="text-white my-auto text-sm font-semibold drop-shadow-md">
                {Math.round(percentage)}%
            </span>
            </motion.div>
        </div>
    )

}