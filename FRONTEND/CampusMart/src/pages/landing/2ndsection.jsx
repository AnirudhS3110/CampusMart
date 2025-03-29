import {motion, AnimatePresence}  from "motion/react"
import { memo, useEffect, useState } from "react"
import {ChevronsLeft} from "lucide-react"   

export default function SecondSection()
{
    const [mobileView,setMobileView] = useState(window.innerWidth < 768)
    useEffect(()=>{
       function handleResize()
       {
            setMobileView(window.innerWidth < 768)
            if(window.innerWidth < 768)
                setMobileView(true);
            else
            {
                setMobileView(false);
            }
       }
       handleResize()
       window.addEventListener('resize',handleResize);

       return ()=>window.removeEventListener('resize',handleResize);

    },[])
    const [cards,setCards] = useState([{image:"https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312147/campusMart/vi7jaljhdm43mf8bjhhj.png",header:"Easy Selling",message:"List your items quickly and reach the entire campus community with our user-friendly interface."},
        {image:"https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312123/campusMart/ivbbr7slre3bkqo8i20s.png",header:"Dynamic Bidding",message:"Get the best deals by participating in our exciting and fair bidding system."},
        {image:"https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312178/campusMart/gsok8rjaetbswpduswi9.png",header:"Secure Transactions",message:"Enjoy peace of mind with our trusted and secure payment system for all your trades."},
        {image:"https://res.cloudinary.com/dbvebbsbh/image/upload/v1742312062/campusMart/ivl0luk0oqe0h8pyrkqm.png",header:"Instant Notifications",message:"Stay updated with real-time alerts on your bids, sales, and purchases."}
    ])
    return(
        <section className="w-[100vw] min-h-[100vh]  lg:px-[100px]  bg-[#0f3772] flex items-center ">
            {(mobileView) ? (<div className="py-[30px] pt-[100px]  w-[100%] bg-[#0f3772] ">
                <div className="flex justify-center text-[25px]  text-poppins  text-white lg:text-[40px] lg:font-semibold text-center">
                    Why choose <span className="text-cyello">  Campus Mart </span>?
                </div >
                <div className="flex justify-center my-[40px]">
                <Carousal cards={cards} setCards={setCards} />
                </div>

            </div>) : (<div className="py-[30px] h-[100vh] pt-[100px] px-[0px]  w-[100%] bg-[#0f3772] flex justify-between ">
                <AnimatePresence>
                <motion.div 
                initial={{opacity:0,x:-30}}
                whileInView={{opacity:1,x:0}}
                transition={{duration:1.2}}
                viewport={{ once: true, amount: 0.3 }}
                    className="flex justify-between text-[25px]  text-poppins lg:min-w-[50%] my-auto  text-white lg:text-[70px] lg:font-semibold text-start">
                    <span className="min-w-[760px] max-w-[760px] flex flex-col justify-start leading-[.98]">
                    Why choose 
                    <span className="text-cyello text-[80px]">  Campus<span className="text-white font-light">Mart</span> ?</span>
                    </span>
                </motion.div >
                </AnimatePresence>
                <div className="flex  items-center md:mr-[20px]">
                <motion.div className=""
                animate = {{x:[0,-50,0]}}
                transition ={
                    {
                        duration: 3.5,
                        repeat: Infinity,
                        repeatType: "loop"
                        
                    }
                }>
                <ChevronsLeft color="#FFBB0F" size={48}/>
                </motion.div>
                <Carousal cards={cards} setCards={setCards} className="my-auto " />
                </div>

            </div>)}
        </section>
    )
}

const Carousal  = memo(({cards, setCards}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
        }, 3500); // Change every 3 seconds

        return () => clearInterval(id);
    }, [cards.length]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex} // This forces re-render when index changes
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.8 , delay:.8 }}
                viewport={{once:false}}
                className="max-w-[280px] min-w-[290px] lg:min-w-[380px] lg:pt-[30px] lg:pl-[20px] lg:h-[400px] flex justify-between my-auto "
            >

                
                <motion.div
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                    key={currentIndex}
                    className="min-w-[280px] pb-[30px] max-w-[280px] max-h-[280px] lg:min-w-[340px]  flex flex-col justify-items-center my-auto lg:min-h-[330px] mt-[20px] px-[18px] pt-[15px] mr-[30px] bg-cyello rounded-[20px]"
                >
                    <img src={cards[currentIndex].image} className="w-[50px] mx-auto" />
                    <p className="text-poppins text-[24px] lg:text-[28px] text-white my-[20px] text-center">
                        {cards[currentIndex].header}
                    </p>
                    <p className="text-poppins text-[18px] lg:text-[23px] text-white text-center">
                        {cards[currentIndex].message}
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
});
