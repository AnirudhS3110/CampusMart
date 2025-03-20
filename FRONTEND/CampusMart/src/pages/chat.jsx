import React, { useEffect,useMemo , useRef, useState} from "react";
import { Rocket } from "lucide-react";
import { LogOut } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { setChatID, setChats, setRoomID , setReceiverID, setMessages, addMessage, setNewMessages} from "@/redux/slices/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import store from "@/redux/store";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
  

export default function Chat()
{
    
   
    const userID = useSelector((state)=>state.authentication.userID)
    const chats = useSelector((state)=>state.chat.chats)
    const token = localStorage.getItem("Authtoken");
    const messages = useSelector((state)=>state.chat.messages)
    const dispatch =  useDispatch();
    const socketRef = useRef(null);

    useEffect(() => {
        const Socket = new WebSocket("ws://localhost:5000");
        Socket.onopen = () => {
            Socket.send(
                JSON.stringify({
                    type: "join",
                    payload: {
                        userID: userID,
                    },
                })
            );
        };
        Socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "message")
                dispatch(addMessage(message.payload));    
        };
        socketRef.current = Socket;

        return () => {
            Socket.close();
        };
    }, [dispatch, userID]);

    useEffect(() => {
        async function hitServer() {
            try {
                const res = await axios.post(
                    "http://localhost:3000/chats/getChats",
                    {
                        userId: userID,
                    },
                    {
                        headers: {
                            authorization: token,
                            "Content-Type": "application/json",
                        },
                    }
                );
                dispatch(setChats(res.data.chats));
            } catch (e) {
                console.log("Error:", e);
            }
        }
        hitServer();
    }, [dispatch, token, userID]);

    

    

    const [view,setview] = useState(false);
    const [userName, setUserName] = useState("");
    

    return(
        <ResizablePanelGroup direction="horizontal" className="min-h-[90vh] bg-[#05295e] flex justify-between">
             <ResizablePanel defaultSize={45}>
                     <div className="h-[90%] w-full flex flex-col overflow-y-auto">

                        {chats.map((chat)=><motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px] scrollbar-hide ">
                                    <button key={chat._id} className="w-full, h-full flex justify-start px-[30px] gap-[15px]" onClick={()=>{ setChat({id:chat._id,setView:setview}); setUserName(chat.userName)}}>
                                        <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                            <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                        </div>
                                        <div className="text-white text-[20px] my-auto">
                                            {chat.userName}
                                        </div>
                            
                                    </button>
                                    <hr className="bg-blue-500 opacity-25"></hr>
                                </motion.div>)}

           
                     </div>

             </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={55}>
            <div className="h-full  flex flex-col w-full">
                {(view) ? <ChatElement userName={userName} messages={messages} setview={setview} setUserName={setUserName}/> : null}
            </div>
            
            </ResizablePanel>
        </ResizablePanelGroup>
       
    )




    function ChatElement() {       
        const userID = useSelector((state) => state.authentication.userID); 
        const newMessages = useSelector((state) => state.chat.newmessages);  
        const dispatch = useDispatch();
        const [text, setText] = useState("");
        const endRef = useRef(null);
    
        useEffect(() => {   
            endRef.current?.scrollIntoView({ behavior: "smooth" });
        },[]);
    
        function onSend() {
            if (text === "")
                return;
            
            const socket = socketRef.current;   
            const receiverID = store.getState().chat.receiverID;    
            const chatID = store.getState().chat.roomID;
            try {
                socket.send(JSON.stringify({
                    type: "message",
                    payload: {
                        chatID: chatID,
                        sender: userID,
                        receiver: receiverID,
                        message: text
                    }
                }));
                dispatch(addMessage({ sender: userID, message: text }));
                setText("");
            } catch (e) {
                console.log("Error while sending message to websocket: ", e);
            }
        }
    
        return (
            <div className="w-full h-full flex flex-col">
                <ChatHeader userName={userName} setUserName={setUserName} dispatch={dispatch} setview={setview} />
                <ChatArea messages={messages} endRef={endRef} userID={userID} />
                <LowerArea text={text} setText={setText} onSend={onSend} />
            </div>
        );
    }


    

   
    
}

const ChatHeader = React.memo(({userName,setUserName,dispatch,setview})=>{
    return <div className="h-[10vh]  bg-blue-900 flex justify-between">
    <div className="flex flex-row justify-start gap-[20px] w-[80%] px-[40px]">
        <div className="w-[50px] h-[50px] border-1 rounded-[50%] overflow-hidden my-auto ">
            <img src="" className="w-full h-full object-cover border-[2px] border-cyello rounded-[50%] "/>
        </div>
        <div className="w-[80%] my-auto text-white  text-[28px]">
            {console.log("UserName:",userName)}
            {userName}
        </div>
    </div>
    <Button  className="my-auto mx-10 bg-cyello" onClick={()=>{setview(false); setUserName("");dispatch(setMessages([]));dispatch(setNewMessages([]))}}>
        <LogOut/>
    </Button>
</div>
})

const ChatArea = React.memo(({messages,endRef,userID})=>{
    return<div  className="h-[70vh] flex flex-col gap-[12px] overflow-y-scroll px-[30px] my-[17px]">
                    {messages.map((message)=>{
                        return<div  className={`${message.sender === userID ? "justify-end" : "justify-start"} flex`}>
                            <MessageDiv message={message}/>
                        </div>
                    })}
                    <div ref={endRef} />
                </div>
})





const LowerArea = React.memo(({text,setText,onSend})=>{
            
    return (<form onSubmit={(e)=>{e.preventDefault();try{onSend();}catch(e){console.log("Error while pressing send");}}} className="h-[10vh] flex bg-blue-900">
        <input value={text} onChange={(e)=>setText(e.target.value)} type="text" placeholder="Enter text..."  className="border-[2px] px-[8px] py-[4px] rounded-sm m-4 w-[80%] bg-white"></input>
        <motion.div whileTap={{ scale: 0.95 }} className="w-[10%]  align-middle">
        <Button type="submit"  className="mt-[17px]  bg-cyello w-full px-auto ">
            <Rocket />
        </Button>
        </motion.div>
    </form>)

})

    


 const MessageDiv= React.memo(({message})=>
{
    return(
        <motion.div className="bg-[#0f3772] text-white border-[2px] rounded-[20px] border-[#07295c] px-[10px] py-[6px] min-w-[50px] max-w-[50%] w-fit flex justify-center">
            {message.message}
        </motion.div>
    )
})



async function setChat({id,setView})
    {
        const userID = store.getState().authentication.userID;
        const dispatch = store.dispatch;
        dispatch(setReceiverID(id));
        const token = localStorage.getItem("Authtoken");
        const res = await axios.post('http://localhost:3000/chats/createChat',{
                first:userID,
                second:id
    },{
        headers:{
            "authorization":token,
            "Content-Type":"application/json"
        }
    }) 
    dispatch(setRoomID({roomID:res.data.roomID,messages:res.data.messages}));
        setView(true);
        
    }

    

    



