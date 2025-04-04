import React from "react";
import { motion } from "framer-motion";
import {CirclePlus, Ghost} from 'lucide-react'
import { Button } from "../ui/button";
import { Heart, Search ,ShoppingCart} from "lucide-react";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import axios from "axios";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import store from "@/redux/store";
import { useNavigate } from "react-router-dom";


export default function AddLikedListing({likedList})
{
    
    const nav = useNavigate();
    const userID = store.getState().authentication.userID;
    console.log("UserID ",userID)

    async function createChat({second})
    {
        const token = localStorage.getItem('Authtoken');
        try{
            const res = await axios.post('http://localhost:3000/chats/createChat',
                {
                    first:userID,
                    second:second
                },{
                    headers:{
                        "authorization":token,
                        "Content-Type":"application/json"
                    }
                }
            )

            if(res.data.success)
            {
                nav('/chat')
            }
        }catch(e){
            console.log("Error while creating chat")
        }

    }

    return(
        <CarouselContent className={`gap-[50px] md:gap-0`}>
            <CarouselItem className=" md:basis-1/2 lg:basis-1/4">
                                            <Card  className="bg-[#0f3772] max-w-[300px] min-w-[315px] min-h-[450px] max-h-[450px] md:max-w-[340px] border-[#07295c] flex flex-col justify-center" >
                                                
                                                <CardContent  className="h-[200px]  w-full flex flex-col justify-center gap-7 items-center" >
                                                <h3 className="text-[28px] text-white">Add new Item</h3>
                                                    <motion.button whileHover={{scale:1.03}} whileTap={{scale:1.05}} onClick={()=>{nav('/marketPlace')}} className="  rounded-[50%]" >
                                                        <CirclePlus className="w-20 h-20" color="white">
                                                            Add
                                                        </CirclePlus>
                                                    </motion.button>
                                                </CardContent>
                                            </Card>
            </CarouselItem>

            {likedList.map((item)=><CarouselItem className="md:basis-1/2 lg:basis-1/4">
                                    <Card className="max-w-[325px] min-w-[315px] max-h-[450px] py-0 bg-[#0b336e] border-[#05295e] box-border">
                                    
                                                        <CardContent className={`min-h-[300px] px-0 bg-[#05295e] pt-0 my-0 overflow-hidden rounded-[20px]`} >
                                                            <div className="min-w-[300px] w-[310px] max-w-[325px] h-[302px]  min-h-[300px] max-h-[306px] relative rounded-[20px] box-border">
                                                                <motion.img whileHover={{scale:1.03}} transition={{duration:0.2, ease: "easeInOut"}}  className="w-full h-full rounded-[20px]  object-cover" src={item.image} />
                                                                <LikeButton itemID={item._id} />
                                                                <motion.div whileTap={{scale:.95}} className="absolute top-2 lg:top-0 left-1">
                                                                    <Button onClick={()=>{createChat({second:item.seller })}} variant="ghost" className={`bg-cyello rounded-full text-white md:text-[16px]`} >Chat with Seller!</Button>
                                                                </motion.div>
                                                            </div>
                                                        </CardContent>
                                    
                                                        <CardFooter className={`px-[4px] pt-0 my-0 py-0 `}>
                                                            <div className="min-w-[300px] w-[302px] py-0 max-w-[325px] h-[302px] box-border px-[8px]  min-h-[300px] max-h-[306px] flex flex-col gap-[8px]">
                                    
                                                                <div className="w-full flex py-0 justify-between items-center">
                                                                    <h2 className="text-cyello md:text-[24px] truncate">{item.title}</h2>
                                                                    <motion.div whileTap={{scale:1}} whileHover={{scale:1.028}} transition={{duration:.3}}> 
                                                                        <Button variant="ghost" className={`bg-white rounded-full text-[#05295e] md:text-[16px]`}>
                                                                            <ShoppingCart/>
                                                                            AddtoCart    
                                                                        </Button>
                                                                    </motion.div>
                                                                </div>
                                    
                                                                <div className="w-full text-gray-400 text-[14px] text-ellipsis line-clamp-2">
                                                                {item.description}
                                                                </div>
                                                                
                                                                <div className="w-full flex justify-items-start text-[15px] md:text-[18px] text-cyello justify-between">
                                                                    <h3>{item.price}</h3>
                                                                    {/* <h3>{item.seller? item.seller.userName.toUpperCase() : "Seller"}</h3> */}
                                                                </div>
                                    
                                                            </div>
                                                        </CardFooter>
                                                        </Card>
                                </CarouselItem>)}
        </CarouselContent>

    )

}




function LikeButton({itemID})
{

    const userID = store.getState().authentication.userID;
    const token = localStorage.getItem('Authtoken');
    const [like,setLike] = useState(true);
    const [dummy,setDummy] = useState(0)

    
    useEffect(()=>{
        if(dummy%2==0 && dummy)
            {
                async function setLike()
                {
                    try{
                        const res = await axios.post('http://localhost:3000/marketplace/setLike',
                            {
                                userID:userID,
                                listID:itemID
                            },{
                                headers:{
                                    'authorization':token,
                                    'Content-Type':'application/json'
                                }
                            }
                        )
                        if(res.data.success)
                        {
                            alert("Added to your favorites")
                        }
                    }catch(e)
                    {
                        console.log("Error");
                    }
                }
                setLike();
             }
            if(dummy%2){
                async function removeLike()
                {
                    try{
                        const res = await axios.post('http://localhost:3000/marketplace/removeLike',
                            {
                                userID:userID,
                                listID:itemID
                            },{
                                headers:{
                                    'authorization':token,
                                    'Content-Type':'application/json'
                                }
                            }
                        )
                        if(res.data.success)
                        {
                            alert("Removed from your Favorites")
                        }
                    }catch(e)
                    {
                        console.log("Error");
                    }
                }
                removeLike();

                
            }

    },[dummy])
    return <button onClick={()=>{setLike(!like);setDummy(dummy=>dummy+1);}} className="absolute top-2 right-2  p-1 rounded-full shadow-md"> <Heart color={like? "none":"black"} fill={like ? "red": "none"} /> </button>
    
}