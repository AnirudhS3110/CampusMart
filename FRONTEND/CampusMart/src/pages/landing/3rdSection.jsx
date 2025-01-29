import { motion } from "motion/react";

export default function ThirdSection()
{
    return(
        <section className="bg-cblue">
            <div className="w-full text-poppins mb-[70px] gap-[20px] text-white text-center font-semibold lg:text-[40px] ">
                What our <span className="text-cyello">Users </span> say
            </div>

            <div className="flex justify-center ">
                <FeedBack/>
            </div>
        </section>
    )

}

function FeedBack()
{
    return(
        <div className="mb-[40px] flex flex-row flex-wrap lg:gap-[30px]">

            <motion.div whileHover={{scale:1.1, transition:{duration:0.2}}} className="lg:w-[280px] lg:h-[280px] font-poppins px-[21px] py-[30px] rounded-[20px] bg-white">
                <div className="flex flex-row align-middle justify-around mb-[16px]">
                    <div className="rounded-full w-[55px] h-auto">
                    <img className="rounded-full w-full h-fit" src="src/images/pic1.png"/>
                    </div>

                    <div className="flex flex-col border-b-[1px] border-b-white transition-all duration-200 hover:border-b-blue-500 ">
                        <h3 className="font-semibold text-[20px] text-cblue">Alex Johnson</h3>
                        <p className="text-cyello font-poppins text-[10px]">Sophomore,Computer science</p>
                    </div>
                </div>
                <div className="font-poppins font-normal text-[16px] text-cblue">
                CampusMart has been a game-changer for me! I've sold my old textbooks and found great deals on electronics. The bidding system is so much fun! 
                </div>
            </motion.div>

            <motion.div whileHover={{scale:1.1, transition:{duration:0.2}}} className="lg:w-[280px] lg:h-auto font-poppins px-[21px] py-[30px] rounded-[20px] bg-white">
                <div className="flex flex-row align-middle justify-around mb-[16px] ">
                    <img className="rounded-full w-[50px] h-[50px]" src="src/images/pic3.png"/>

                    <div className="flex flex-col border-b-[1px] border-b-white transition-all duration-200 hover:border-b-blue-500 ">
                        <h3 className="font-semibold text-[20px] text-cblue">Michael Brown</h3>
                        <p className="text-cyello font-poppins text-[10px]">Freshman, Engineering</p>
                    </div>
                </div>
                <div className="font-poppins font-normal text-[16px] text-cblue">
                As a new student, campusMart helped me find affordable furniture for my dorm. The community is friendly and helpful!                
                </div>
            </motion.div>

            <motion.div whileHover={{scale:1.1, transition:{duration:0.2}}} className="lg:w-[280px] lg:h-auto font-poppins px-[21px] py-[30px] rounded-[20px] bg-white">
                <div className="flex flex-row align-middle justify-around mb-[16px]">
                    <img className="rounded-full w-[50px] h-[50px]" src="src/images/pic2.png"/>

                    <div className="flex flex-col border-b-[1px] border-b-white transition-all duration-200 hover:border-b-blue-500 ">
                        <h3 className="font-semibold text-[20px] text-cblue">Samantha Lee</h3>
                        <p className="text-cyello font-poppins text-[10px]">Junior, Business Administration</p>
                    </div>
                </div>
                <div className="font-poppins font-normal text-[16px] text-cblue">
                I love to say how easy it is to list items for sale. The secure payment system gives me peace of mind for every transaction.                </div>
            </motion.div>
        </div>
    )
}