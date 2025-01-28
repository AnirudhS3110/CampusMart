import {motion}  from "motion/react"
import { memo, useEffect, useState } from "react"

export default function SecondSection()
{
    const [cards,setCards] = useState([{image:"src/images/ShoppingCart.png",header:"Easy Selling",message:"List your items quickly and reach the entire campus community with our user-friendly interface."},
        {image:"src/images/ShoppingCart.png",header:"Dynamic Bidding",message:"Get the best deals by participating in our exciting and fair bidding system."},
        {image:"src/images/ShoppingCart.png",header:"Secure Transactions",message:"Enjoy peace of mind with our trusted and secure payment system for all your trades."},
        {image:"src/images/ShoppingCart.png",header:"Easy Selling",message:"List your items quickly and reach the entire campus community with our user-friendly interface."}
    ])
    return(
        <section className="">
            <div className="py-[30px] pt-[100px] w-[100%] bg-cblue">
                <div className=" text-poppins  text-white lg:text-[33px] lg:font-semibold text-center">
                    Why choose <span className="text-cyello">Campus Mart </span>?
                </div >
                <div className="flex justify-center my-[40px]">
                <Carousal cards={cards} setCards={setCards} />
                </div>

            </div>
        </section>
    )

}

const Carousal  = memo(({cards,setCards})=>{
    

    useEffect(()=>{
        const id = setInterval(()=>{
            const tempCards = [...cards]
            const card = tempCards.shift();
            tempCards.push(card)
            setCards(tempCards);
            console.log("Cards changed")
        },5000)

        return ()=>clearInterval(id);
    },[cards, setCards])

    return(
        <div className=" w-[930px] h-[400px]  flex justify-between overflow-x-hidden">
            {
             
                cards.map((card,index)=>{
                    return(
                        <motion.div whileHover={{scale:1.1 , transition:{duration:0.2}}} key={index} className="min-w-[280px] max-w-[280px] max-h-[280px]  min-h-[280px] px-[18px] pt-[15px] mr-[30px] justify-center bg-cyello rounded-[20px]">
                                
                                <p className="text-poppins text-[24px] text-white my-[20px] text-center ">{card.header}</p>
                                <p className="text-poppins text-[18px] text-white  text-center ">{card.message}</p>
                        </motion.div>
                    )
                })
            }


        </div>
    )
})