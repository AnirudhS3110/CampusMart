import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"


export default function FourthSection()
{
    const nav = useNavigate();

    return(
        <section className="bg-cblue h-[80vh] pt-[180px] pb-[80px] ">
            <div className="w-full justify-items-center  ">
                <motion.div
                initial={{opacity:0, y:-30}}
                whileInView={{opacity:1,y:0}}
                transition={{duration:1.2}}
                viewport={{once:false}}
                 className="font-poppins text-[28px] font-semibold lg:text-[45px] text-center text-white pb-[30px] ">
                    Ready to join <span className="text-cyello">Campus</span>Mart ?
                </motion.div>
                <div className="text-white font-poppins font-light text-[20px] pb-[30px]">
                <p className="text-center">Start buying, selling, and bidding today. Join thousands of students who are already part of the campusMart community!</p>
                </div>
                <motion.button whileTap={{scale:.95}} className="bg-white rounded-[35px] border-2 border-white transition-colors duration-200 lg:text-[30px] text-cblue px-[30px] py-[10px] hover:bg-cblue hover:text-white  " onClick={()=>nav('/signup')}>
                    Sign up Now
                </motion.button>
            </div>
        </section>
    )
}