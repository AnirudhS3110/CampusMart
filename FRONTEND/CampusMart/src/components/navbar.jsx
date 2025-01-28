import { Link } from "react-router-dom"
import { motion } from "motion/react"

export default function Navbar()
{
    return(
        <div className='h-[70px] bg-[#0C4CAB] flex flex-row  justify-between px-[30px] lg:px-[120px]  '>
            <div className="my-auto "> 
                <img src="src/images/CampusMart.png" className="w-[130px] lg:w-[170px]"></img>
            </div>

            <div className="hidden lg:flex lg:justify-between lg:my-auto">
                <Link className="font-Poppins text-white gap-1.5 mx-[15px]">
                    Home
                </Link>
                <Link className="font-Poppins text-white gap-1.5 mx-[15px]">
                About
                </Link>
                <Link className="font-Poppins text-white gap-1.5 mx-[15px]">
                How It Works
                </Link>
                <Link className="font-Poppins text-white gap-1.5 mx-[15px]">
                Contact
                </Link>
            </div>

            <div className="my-auto hidden lg:flex gap-[10px]">
                <motion.button whileTap={{scale:.95}} className="border-[1px] border-cblue rounded-[20px] px-[15px] py-[6px] text-[14px] text-white bg-cblue font-poppins ">
                    Sign Up
                </motion.button>
                <motion.button whileTap={{scale:.95}} className="border-[1px] border-cblue rounded-[20px] px-[15px] py-[6px] text-[14px] text-white bg-cblue font-poppins ">
                    Sign In
                </motion.button>
            </div>

            <div className="my-auto lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>


        </div>
    )
}