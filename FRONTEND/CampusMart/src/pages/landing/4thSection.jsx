import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"


export default function FourthSection()
{
    const nav = useNavigate();

    return(
        <section className="bg-cblue pt-[180px] pb-[80px] ">
            <div className="w-full justify-items-center  ">
                <div className="font-poppins font-semibold lg:text-[35px] text-center text-white pb-[30px] ">
                    Ready to join <span className="text-cyello">Campus</span>Mart ?
                </div>
                <div className="text-white font-poppins font-light text-[20px] pb-[30px]">
                <p className="text-center">Start buying, selling, and bidding today. Join thousands of students who are already part of the campusMart community!</p>
                </div>
                <motion.button whileTap={{scale:.95}} className="bg-white rounded-[35px] lg:text-[30px] text-cblue px-[30px] py-[10px]  " onClick={()=>nav('/signup')}>
                    Sign up Now
                </motion.button>
            </div>
        </section>
    )
}