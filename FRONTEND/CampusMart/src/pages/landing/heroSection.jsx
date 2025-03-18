import React from "react";
import { ArrowRight } from "lucide-react";
import {motion} from "motion/react"

export default function Landing()
{
    return(
        <section className="w-[100%] h-full bg-[#0f3772]">
            <div className=" mx-[60px] flex flex-row justify-end  lg:ml-[140px] lg:mr-0">
                <LeftDiv/>
                <RightDiv/>        
            </div>
        </section>
    )
}

function LeftDiv()
{
    const scndline = "text-cyello font-semibold transition-all duration-200 hover:text-[50px] lg:hover:text-[60px]";
    const thrdline = "text-cyello font-semibold text-[20px] transition-all duration-200 hover:text-[50px] lg:text-[32px] lg:hover:text-[36px]";
    const button = "text-white py-[18px] px-[50px] max-w-[277px] max-h-[70] rounded-[35px]"
    return(
        <div className="w-[100%] font-Poppins text-white mt-[30px] lg:min-w-[670px] lg:mt-[40px] lg:ml-[75px] ">
            <div className="text-center mb-[30px] leading-[110%] font-semibold text-[24px] lg:hidden ">
                <h2 className="">Your</h2>
                <span className={scndline}>Campus </span><span className={scndline}>Marketplace</span>
                <h2>Reimagined!</h2>
            </div>

            <div className="   hidden  lg:mb-[10px] lg:block lg:leading-[110%] lg:font-semibold lg:text-[55px]">
                <h2 className="">Your
                <span className={scndline}> Campus </span><span className={scndline}>Marketplace</span>
                </h2>
                
                <h2>Reimagined!</h2>
            </div>

            <div className="text-center mb-[10px] lg:text-left ">
                <span className={thrdline} >Buy </span> <span className={thrdline}>Sell </span><span>&</span> <span className={thrdline}> Bid</span>
                <h2 className="text-[14px] lg:text-[24px]">Items within your Campus community!</h2>
            </div>

            <div className="text-center lg:text-left ">
                <h3 className="text-[14px] lg:text-[24px]">Experience a new way of trading that's</h3>
                <span className={thrdline} >Safe </span> <span className={thrdline}>Easy </span><span>&</span> <span className={thrdline}>Fun</span>
            </div>

            <div className="flex justify-center gap-[15px] flex-wrap lg:flex-row lg:gap-[30px] lg:justify-start">
                <motion.button whileTap={{scale: 0.95}} className="flex justify-between align-middle text-white px-[16px] py-[8px] border-[2px] border-cyello lg:py-[10px] lg:px-[50px] lg:max-w-[277px] lg:max-h-[70] rounded-[35px] bg-cyello transition-all duration-200 hover:bg-cblue hover:text-white hover:border-white lg:mt-[20px] ">
                    Start Selling
                    <ArrowRight className="ml-3 h-5 w-5" />
                </motion.button>

                <motion.button whileTap={{scale: 0.95}} className="flex justify-between align-middle border-[2px] border-white text-white bg-cblue px-[16px] py-[8px] lg:py-[10px] lg:px-[50px] lg:max-w-[277px] lg:max-h-[70] rounded-[35px]  transition-all duration-200 hover:bg-cyello hover:text-white hover:border-cyello lg:mt-[20px] ">
                    Start Buying
                    <ArrowRight className="ml-3 h-5 w-5" />
                </motion.button>

            </div>

        </div>
    )
}

function RightDiv()
{
    return(
        <div className="hidden lg:flex lg:w-[632px]">
                <img src="https://res.cloudinary.com/dbvebbsbh/image/upload/v1742311899/campusMart/qyhysdbp0zzkphqmn9vz.png"></img>
        </div>
    )
}