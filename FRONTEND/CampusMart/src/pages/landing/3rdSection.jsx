import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronsRight } from "lucide-react";

const cards = [{picture:"https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312314/campusMart/e6nyjweqv0cwq6owbqp6.png",name:"Alex Johnson",role:"Sophomore,Computer science",feedback:"CampusMart has been a game-changer for me! I've sold my old textbooks and found great deals on electronics. The bidding system is so much fun!"},
    {picture:"https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312373/campusMart/kzdrjs67sj772vsduv55.png",name:"Michael Brown",role:"Freshman, Engineering",feedback:"As a new student, campusMart helped me find affordable furniture for my dorm. The community is friendly and helpful!"},
    {picture:"https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312352/campusMart/ahkg0xlobqhbmincomzt.png",name:"Samantha Lee",role:"Junior, Business Administration",feedback:"I love to say how easy it is to list items for sale. The secure payment system gives me peace of mind for every transaction."}
]

export default function ThirdSection()
{
    return(
        <section className="bg-[#0f3772] min-h-[70vh] lg:min-h-[100vh] lg:flex lg:flex-row-reverse lg:justify-around lg:px-[100px] lg:items-center">
            <div className="w-full text-[30px]  text-poppins mb-[70px] gap-[20px] text-white text-center font-semibold lg:hidden lg:text-[50px] md:max-w-[50%]  ">
                What our <span className="text-cyello">Users </span> say
            </div>
            <motion.div 
            initial={{opacity:0,x:30}}
            whileInView={{opacity:1,x:0}}
            transition={{duration:1.2}}
            viewport={{once:false}}
            className="w-full  hidden lg:block text-poppins mb-[70px]  text-white text-end font-semibold whitespace-pre lg:text-[70px] md:max-w-[50%] leading-[0.9] ">
                <span className="font-light text-end">
                What our {"\n"}
                <span className="text-cyello text-[90px] font-regular text-start"> Users</span> say!
                </span>
            </motion.div>

            <div className="flex justify-center box-border pl-[30px] gap-[15px] ">
                <FeedBack cards={cards}/>
                <motion.div
                animate = {{x:[0,30,0]}}
                transition={{
                    repeat:Infinity,
                    repeatType: "loop",
                    duration:4}}
                 className="hidden lg:flex lg:items-center">
                    <ChevronsRight size={50} color="#FFBB0F" className="hidden lg:block"></ChevronsRight>
                </motion.div>
            </div>
        </section>
    )

}

function FeedBack({cards})
{
    const [index,setIndex] = useState(0);
    useEffect(()=>{
        const id = setInterval(()=>{
            setIndex((index)=>(index+1)%cards.length);

        },4000)

        return ()=>clearInterval(id);
    },[cards.length])
    return(
        <div className="mb-[40px] mx-[15px] flex lg:flex-row flex-wrap gap-[30px] lg:mx-0 ">
            <AnimatePresence mode="wait">
            <motion.div
            key={index}
            initial={{opacity:0, x:-30}}
            whileInView={{opacity:1,x:0}}
            exit={{opacity:0,x:10}}
            transition={{duration:0.8,delay:.5}} 
            viewport={{once:false}}>
            <motion.div whileHover={{scale:1.1, transition:{duration:0.2}}} className="lg:w-[330px] lg:h-[330px] font-poppins px-[21px] py-[30px] rounded-[20px] bg-white">
                <div className="flex flex-row align-middle justify-around mb-[16px]">
                    <div className="rounded-full w-[55px] h-auto">
                    <img className="rounded-full w-full h-fit" src={cards[index].picture}/>
                    </div>

                    <div className="flex flex-col border-b-[1px] border-b-white transition-all duration-200 hover:border-b-blue-500 ">
                        <h3 className="font-semibold text-[20px] lg:text-[24px] text-cblue">{cards[index].name}</h3>
                        <p className="text-cyello font-poppins text-[10px] lg:text-[10px]">{cards[index].role}</p>
                    </div>
                </div>
                <div className="font-poppins font-normal text-[16px] lg:text-[22px] text-cblue lead-[0.94]">
                {cards[index].feedback} 
                </div>
            </motion.div>
            </motion.div>
            </AnimatePresence>

            {/* <motion.div whileHover={{scale:1.1, transition:{duration:0.2}}} className="lg:w-[280px] lg:h-auto font-poppins px-[21px] py-[30px] rounded-[20px] bg-white">
                <div className="flex flex-row align-middle justify-around mb-[16px] ">
                    <img className="rounded-full w-[50px] h-[50px]" src="https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312373/campusMart/kzdrjs67sj772vsduv55.png"/>

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
                    <img className="rounded-full w-[50px] h-[50px]" src="https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312352/campusMart/ahkg0xlobqhbmincomzt.png"/>

                    <div className="flex flex-col border-b-[1px] border-b-white transition-all duration-200 hover:border-b-blue-500 ">
                        <h3 className="font-semibold text-[20px] text-cblue">Samantha Lee</h3>
                        <p className="text-cyello font-poppins text-[10px]">Junior, Business Administration</p>
                    </div>
                </div>
                <div className="font-poppins font-normal text-[16px] text-cblue">
                I love to say how easy it is to list items for sale. The secure payment system gives me peace of mind for every transaction.                </div>
            </motion.div> */}
        </div>
    )
}