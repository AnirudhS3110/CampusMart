import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ShoppingCart,User , MessageCircle,MessageSquareDot} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import axios from "axios";
import store from "@/redux/store";

export default function protectedNavBar()
{
    const [Location,setLocation] = useState("");
    const location = useLocation();
    const [notifCount,setNotifCount] = useState(2);
    const userID = store.getState().authentication.userID;
    const token = localStorage.getItem("Authtoken");
    const nav = useNavigate();
   

    useEffect(()=>{
        async function getNotifCount()
        {
            try{
                const response = await axios.post('http://localhost:3000/chats/unreadMessages',{
                    userID:userID
                },{
                    headers:{
                        "authorization":token,
                        "Content-Type":"application/json"
                    }
                });
                 setNotifCount(response.data.notificationCount)
            }catch(e){
                console.error("Error while gettng notifCount");
            }

        }
        getNotifCount()

        
    },[])

    useEffect(()=>{
        if(location.pathname==='/dashboard')
            setLocation("DASHBOARD");
        else if(location.pathname==='/chat')
            setLocation("CHAT");
        else if(location.pathname==='/marketPlace')
            setLocation("MARKETPLACE");
    },[location])
    return(
        <div className="w-full h-[10vh] flex flex-row justify start sticky top-0 z-50 bg-[#062D67]">
            <div className="w-full flex flex-row justify-evenly ">
                <div className="my-auto max-w-[25%] lg:max-w-[10%]">
                    <img src="https://res.cloudinary.com/dbvebbsbh/image/upload/v1742311986/campusMart/fxefdawiekznrmvhmz3y.png" className="lg:w-[100%] lg:h-auto mx-auto"/>
                </div>

                <div className="text-cyello my-auto lg:text-[32px] lg:font-semibold ">
                        {Location}
                </div>

                <div className="flex flex-row justify-between gap-[20px] align-baseline  ">
                    <motion.div  className="h-full  border-b-2 border-b-[#062D67] hover:border-b-2 hover:border-b-cyello  ">
                        <Button variant="ghost" size="icon" className="  bg-[#062D67]   h-full lg:w-[50px] flex justify-center hover:bg-[#062D67]   " >
                            <ShoppingCart color="white" className="w-[40px] h-[40px] group-hover:text-yellow-500"  ></ShoppingCart>
                        </Button>
                    </motion.div>

                    
                    
                    <motion.div whileTap={{scale:1.05}} className="flex my-auto">
                        <Button variant="ghost" size="icon" className="my-auto rounded-full bg-[#0C4CAB] opacity-80 lg:h-[50px] lg:w-[50px] hover:opacity-100 hover:bg-[#0C4CAB]" onClick={()=>{nav('/chat');}}>
                            {(notifCount>0)? <MessageSquareDot color="white">{notifCount}</MessageSquareDot> :<MessageCircle color="white"/> }
                        </Button>
                    </motion.div>

                    <motion.div whileTap={{scale:1.05}} className="flex my-auto">
                        <Button variant="ghost" size="icon" className="my-auto rounded-full bg-[#0C4CAB] opacity-80 lg:h-[50px] lg:w-[50px] hover:opacity-100 hover:bg-[#0C4CAB] " onClick={()=>{nav('/dashboard');}}>
                            <User color="white" size={50} className="w-full h-full" />
                        </Button>
                    </motion.div>
                </div>
                
            </div>

        </div>
    )
}