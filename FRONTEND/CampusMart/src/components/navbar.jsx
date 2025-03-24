import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion } from "motion/react"

export default function Navbar()
{
    const nav= useNavigate();
    const loc = useLocation();

    function scrollSmooth(id)
    {
        const section = document.getElementById(id);
        console.log(section);
        if(section)
        {
            section.scrollIntoView({behaviour:"smooth"})
        }
    }
    if(loc.pathname!=='/')
        return null;
    else    
    return(
        <div className='h-[70px] bg-[#0C4CAB] flex flex-row  justify-between px-[30px] lg:px-[120px] sticky top-0    '>
            <motion.div whileTap={{scale:1.05}} className="my-auto "> 
                <motion.img whileTap={{scale:1.05}} src="https://res.cloudinary.com/dbvebbsbh/image/upload/v1742311986/campusMart/fxefdawiekznrmvhmz3y.png" className="w-[130px] lg:w-[170px]"></motion.img>
            </motion.div>

            <div className="hidden lg:flex lg:justify-between lg:">
                
                <div onClick={()=>scrollSmooth("hero")} className="flex border-b-[2px]   border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello hover:text-cyello  text-white gap-1.5 mx-[15px] ">
                    <Link className="font-Poppins my-auto">
                        Home
                    </Link>
                </div>
                <div onClick={()=>scrollSmooth("hero")} className="flex border-b-[2px] border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello text-white hover:text-cyello">
                    <Link className="font-Poppins gap-1.5 mx-[15px] my-auto">
                        About
                    </Link>
                </div>
                <div onClick={()=>scrollSmooth("second")}  className="flex border-b-[2px] border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello text-white hover:text-cyello">
                    <Link to={'/'} className="font-Poppins gap-1.5 mx-[15px] my-auto">
                        How it Works
                    </Link>
                </div>
                <div onClick={()=>scrollSmooth("end")} className="flex border-b-[2px] border-b-[#0C4CAB] transition-all duration-200 hover:border-b-cyello text-white hover:text-cyello">
                    <Link className="font-Poppins gap-1.5 mx-[15px] my-auto">
                        Contact
                    </Link>
                </div>
            </div>

            <div className="my-auto hidden lg:flex gap-[10px]">
                <motion.button whileTap={{scale:.95}} className="border-[1px] border-cblue rounded-[20px] px-[15px] py-[6px] text-[14px] text-white bg-blue-600 transition-all duration-200 font-poppins  hover:opacity-80" onClick={()=>nav('/signup')}>
                    Sign Up
                </motion.button>
                <motion.button whileTap={{scale:.95}} className="border-[1px] border-cblue rounded-[20px] px-[15px] py-[6px] text-[14px] text-white bg-blue-600 transition-all duration-200 font-poppins  hover:opacity-80 " onClick={()=>nav('/signin')} >
                    Sign In
                </motion.button>
            </div>

            <div className="my-auto lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
            </div>


        </div>
    )
}