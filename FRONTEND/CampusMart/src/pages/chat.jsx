import React, { useCallback, useEffect,useMemo , useRef, useState} from "react";
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
import {CheckCheck} from "lucide-react";

export default function Chat()
{
    
   
    const userID = useSelector((state)=>state.authentication.userID)
    const chats = useSelector((state)=>state.chat.chats)
    const token = localStorage.getItem("Authtoken");
    const messages = useSelector((state)=>state.chat.messages)
    const dispatch =  useDispatch();
    const socketRef = useRef(null);
    const [isChatting,setIsChatting] = useState(false);

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
            else if(message.type  == "seen")
                setIsChatting(true);
            else if(message.type == "offline")
                {
                    setIsChatting(false);
                }   
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

    async function setRead(id)
    {
        try{
            const response = await axios.post('http://localhost:3000/chats/setRead',{
                chatID:id,
                receiver:userID
            },{
                headers:{
                    "authorization":token,
                    "Content-Type":"application/json"
                }
            });
        }catch(e){
            console.log("Error while setting read:",e);
        }
    }

    function enterRoom(id,receiver)
    {
        try{
            const socket = socketRef.current;
            socket.send(JSON.stringify({
                type:"enterRoom",
                payload:{
                    chatID:id,
                    first:userID,
                    second:receiver 
                }
            }))
        }catch(e)
        {
            console.log("Error while entering room:",e);
        }
    }

    function onExit()
    {
        const id = store.getState().chat.roomID;
        const socket = socketRef.current;
        socket.send(JSON.stringify({
            type:"exitRoom",
            payload:{
                chatID1:id,
                userID1:userID
            }
        }))

    }


    
    

    return(
        <ResizablePanelGroup direction="horizontal" className="min-h-[90vh] bg-[#05295e] flex justify-between">
             <ResizablePanel defaultSize={45}>
                     <div className="h-[90%] w-full flex flex-col overflow-y-auto">

                        {chats.map((chat)=><motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px] scrollbar-hide ">
                                    <button className="w-full, h-full flex justify-start px-[30px] gap-[15px]" onClick={()=>{ 
                                        setChat({id:chat.receiver[0]._id,setView:setview}); 
                                        setUserName(chat.receiver[0].userName);
                                        setRead(chat.chatID)
                                        enterRoom(chat.chatID,chat.receiver[0]._id);}}>
                                        <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                            <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                        </div>
                                        <div className="text-white text-[20px] my-auto">
                                            {chat.receiver[0].userName}
                                        </div>
                            
                                    </button>
                                    <hr className="bg-blue-500 opacity-25"></hr>
                                </motion.div>)}

           
                     </div>

             </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={55}>
            <div className="h-full  flex flex-col w-full">
                {(view) ? <ChatElement userName={userName} messages={messages} setview={setview} setUserName={setUserName} isChatting={isChatting}/> : null}
            </div>
            
            </ResizablePanel>
        </ResizablePanelGroup>
       
    )

    



    function ChatElement() {       
        const userID = useSelector((state) => state.authentication.userID); 
        const dispatch = useDispatch();
        const [text, setText] = useState("");
        const chatContainerRef = useRef(null);
        const [autoScroll, setAutoScroll] = useState(true);

        useEffect(() => {
            if (chatContainerRef.current && autoScroll) {
                chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
        }, [messages]);
    
        const handleScroll = (e) => {
            const element = e.target;
            const isScrolledNearBottom = 
                element.scrollHeight - element.scrollTop - element.clientHeight < 100;
            setAutoScroll(isScrolledNearBottom);
        };
    
        const onSend= useCallback(()=> {
            if (!text.trim())
                return;
            
            const socket = socketRef.current;   
            const receiverID = store.getState().chat.receiverID;    
            const chatID = store.getState().chat.roomID;
            try {
                socket.send(JSON.stringify(
                    {
                    type: "message",
                    payload: {
                        chatID: chatID,
                        sender: userID,
                        receiver: receiverID,
                        message: text
                    }
                }
                ));
                console.log("isChatting status: ",isChatting);
                if(isChatting)
                    dispatch(addMessage({ sender: userID, message: text, status: "seen" }));
                else
                {
                    dispatch(addMessage({ sender: userID, message: text }));
                }
                setText("");
            } catch (e) {
                console.log("Error while sending message to websocket: ", e);
            }
        },[text,dispatch,userID]);
    
        return (
            <div className="w-full h-full flex flex-col">
                <ChatHeader userName={userName} setUserName={setUserName} dispatch={dispatch} setview={setview} onExit={onExit}/>
                <div 
                ref={chatContainerRef}
                onScroll={handleScroll}
                className="h-[70vh] flex flex-col gap-[12px] overflow-y-auto px-[30px] my-[17px]"
            >
                <MessageList messages={messages} userID={userID} isChatting={isChatting} />
            </div>
                <LowerArea text={text} setText={setText} onSend={onSend} />
            </div>
        );
    }  
}

const MessageList = React.memo(({ messages, userID }) => {
    return messages.map((message, index) => (
        <div 
            key={index} 
            className={`${message.sender === userID ? "justify-end" : "justify-start"} flex`}
        >
            <MessageDiv message={message} userID = {userID} />
        </div>
    ));
});

const ChatHeader = React.memo(({userName,setUserName,dispatch,setview,onExit})=>{
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
    <Button  className="my-auto mx-10 bg-cyello" onClick={()=>{
        setview(false); 
        setUserName("");
        onExit();
        dispatch(setMessages([]));
        dispatch(setNewMessages([]))
        }}>
        <LogOut/>
    </Button>
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

    
 const MessageDiv= React.memo(({message, userID})=>
{
    return(
        <motion.div className="bg-[#0f3772] text-white border-[2px] rounded-[20px] border-[#07295c] px-[10px] py-[6px] min-w-[70px] max-w-[50%] w-fit flex flex-col gap-[3px] justify-center">
            <div className="w-[100%]">
            {message.message}
            </div>
            
            
            <div className=" flex justify-end">
            
            {(message.status === "seen" && message.sender == userID) ? <CheckCheck className="w-[15px] h-[15px]"/>  : null}
            </div>
           
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

    

    



