import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "motion/react"

export default function Navbar()
{
    const nav= useNavigate();
    const loc = useLocation();
    if(loc.pathname!=='/')
        return null;
    else    
    return(
        <div className='h-[70px] bg-[#0C4CAB] flex flex-row  justify-between px-[30px] lg:px-[120px] sticky top-0    '>
            <div className="my-auto "> 
                <img src="src/images/CampusMart.png" className="w-[130px] lg:w-[170px]"></img>
            </div>

            <div className="hidden lg:flex lg:justify-between lg:">
                
                <div className="flex border-b-[2px]   border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello hover:text-cyello  text-white gap-1.5 mx-[15px] ">
                    <Link className="font-Poppins my-auto">
                        Home
                    </Link>
                </div>
                <div className="flex border-b-[2px] border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello text-white hover:text-cyello">
                    <Link className="font-Poppins gap-1.5 mx-[15px] my-auto">
                        About
                    </Link>
                </div>
                <div className="flex border-b-[2px] border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello text-white hover:text-cyello">
                    <Link className="font-Poppins gap-1.5 mx-[15px] my-auto">
                        how it Works
                    </Link>
                </div>
                <div className="flex border-b-[2px] border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello text-white hover:text-cyello">
                    <Link className="font-Poppins gap-1.5 mx-[15px] my-auto">
                        Contact
                    </Link>
                </div>
            </div>

            <div className="my-auto hidden lg:flex gap-[10px]">
                <motion.button whileTap={{scale:.95}} className="border-[1px] border-cblue rounded-[20px] px-[15px] py-[6px] text-[14px] text-white bg-cblue font-poppins " onClick={()=>nav('/signup')}>
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