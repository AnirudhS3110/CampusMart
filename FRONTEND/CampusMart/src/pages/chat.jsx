import React, { useEffect , useState} from "react";
import { Rocket } from "lucide-react";
import { LogOut } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { setChatID, setChats, setRoomID, setSocket } from "@/redux/slices/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

export default function Chat()
{
    
    const [text,setText] = useState("")
    const userID = useSelector((state)=>state.authentication.userID)
    const chats = useSelector((state)=>state.chat.chats)
    const messages = ["hello","hii"]
    const dispatch =  useDispatch();

    function createSocketConnection()
    {
        const Socket = new WebSocket("ws://localhost/5000");
        Socket.onopen = ()=>{
            Socket.send(JSON.stringify({
                type:"join",
                paylaod:{
                    userID:userID
                }
               }))
        }
        dispatch(setSocket(Socket))
    }

    useEffect(()=>{
        async function hitServer()
        {
            try{
                const response = await axios.post('https://localhost:3000/createChat',
                    {
                        first: userID,
                        second: "nothing"
                    }
                );
                dispatch(setRoomID(response.data))
                const res = await axios.post('https  ://localhost:3000/getChats',
                    {
                        userid: userID,
                    }
                )
                dispatch(setChats(res.data.chats))

            }
            catch(e){

            }
        }
        hitServer();
        createSocketConnection();

        return ()=>{
            
        }
    },[])

    useEffect(()=>{},[messages])

    function onSend(e)
    {
        e.preventDefault();
        const socket = useSelector((state)=>state.chat.socket);
        const receiverID = useSelector((state)=>state.chat.receiverID)
        const chatID = useSelector((state)=>state.chat.roomID)
        socket.send(JSON.stringify({
            type:"messsage",
            payload:{
                chatID:chatID,
                sender:userID,
                receiver:receiverID,
                message:text
            }
        }))
    }

    

    return(
        <div className="h-screen bg-cblue flex justify-between ">
            <div className="flex flex-col w-[45%]">

                <div className="w-full bg-blue-900 h-[9.5%] overflow-y-auto ">
                    
                </div>

               <div className="h-[90%] w-full flex flex-col overflow-y-auto">

                {chats.map((chat)=><motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px] scrollbar-hide ">
                            <button key={chat._id} className="w-full, h-full flex justify-start px-[30px] " onClick={()=>{ setChat(chat._id)}}>
                                <div className="h-[40px] w-[30px] border-[1px] border-cyello rounded-[50%]">
                                    <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                </div>
                                <div className="text-white text-[20px]">
                                    {chat.userName}
                                </div>
                            </button>
                        </motion.div>)}

                    <div className="w-full h-[60px]">
                                <button  className="w-full, h-full flex justify-start px-[30px] gap-[15px] " >
                                    <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                        <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                    </div>
                                    <div className="text-white text-[20px] my-auto">
                                        Anirudh
                                    </div>
                                </button>
                                <hr className="bg-blue-500 opacity-25"></hr>
                            </div>
                            <motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px]">
                                <button  className="w-full, h-full flex justify-start px-[30px] gap-[15px] " >
                                    <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                        <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                    </div>
                                    <div className="text-white text-[20px] my-auto">
                                        Anirudh
                                    </div>
                                </button>
                                <hr className="bg-blue-500 opacity-25"></hr>
                            </motion.div>
                    </div>

                    
               </div>
            <div className="h-full flex flex-col w-[55%]">
            <div className="h-[10%]  bg-blue-900 flex justify-between">
                <div className="flex flex-row justify-start gap-[20px] w-[80%] px-[40px]">
                    <div className="w-[50px] h-[50px] border-1 rounded-[50%] overflow-hidden my-auto ">
                        <img src="data:image/jpeg;base64,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" className="w-full h-full object-cover border-[2px] border-cyello rounded-[50%] "/>
                    </div>
                    <div className="w-[80%] my-auto text-white  text-[28px]">
                        Name
                    </div>
                </div>
                <Button className="my-auto mx-10 bg-cyello">
                    <LogOut/>
                </Button>
            </div>
            <div className="h-[80%] flex flex-col gap-[12px] overflow-auto-y px-[30px] my-[17px]">
                {messages.map((message)=><span className="bg-cyello text-white border-[2px] rounded-[20px] border-cyello px-[10px] py-[6px] min-w-[50px] max-w-[50%] w-fit ">{message}</span>)}
            </div>
            <form onSubmit={()=>{onSend(e);}} className="h-[10%] flex bg-blue-900">
                <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Enter text..."  className="border-[2px] px-[8px] py-[4px] rounded-sm m-4 w-[80%] bg-white"></input>
                <motion.div whileTap={{ scale: 0.95 }} className="w-[10%]  align-middle">
                <Button type="submit"  className="mt-[17px]  bg-cyello w-full px-auto ">
                    <Rocket />
                </Button>
                </motion.div>
            </form>
            </div>
        </div>
    )
}



async function setChat(id)
{
    const userID = useSelector((state)=>state.authentication.userID)
   const res = await axios.post('http://localhost/3000/createChat',{
            first:userID,
            second:id
   })
   dispatch(setReceiverID(id));
//    dispatch(setMessages(res.data.messages));
//    dispatch(setChatID(res.data.roomID))    
   dispatch(setRoomID({roomID:res.data.roomID,messages:res.data.messages}))
}