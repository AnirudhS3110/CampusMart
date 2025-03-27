import React, { useCallback, useEffect,useMemo , useRef, useState} from "react";
import { Rocket, ArrowLeft, ArrowRight } from "lucide-react";
import { LogOut } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { setChatID, setChats, setRoomID , setReceiverID, setMessages, addMessage,setIsChatting, setReceiverName, updateMessage, updateLastMessage} from "@/redux/slices/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import store from "@/redux/store";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";
import {CheckCheck} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Chat()
{
    
   
    const userID = useSelector((state)=>state.authentication.userID)
    const chats = useSelector((state)=>state.chat.chats)
    const token = localStorage.getItem("Authtoken");
    const messages = useSelector((state)=>state.chat.messages)
    const dispatch =  useDispatch();
    const socketRef = useRef(null);
    const nav = useNavigate()
    const [isPhone,setIsPhone] = useState(window.innerWidth <= 768); 
    const [isChatView,setIsChatView] = useState(true);

    useEffect(()=>{
        function handleResize()
        {
            setIsPhone(window.innerWidth <= 768);
            if(window.innerWidth < 768)
            {
                setIsChatView(true);
                console.log("is chat view set to true");
            }
                
        }
        window.addEventListener('resize',handleResize);

        return ()=>window.removeEventListener('resize',handleResize);

    },[])

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
                dispatch(setIsChatting(true))
            else if(message.type == "updateStatus")
            {
                dispatch(updateMessage());
            }
            else if(message.type == "offline")
            {
                dispatch(setIsChatting(false))
            }
            else if(message.type == "notify")
            {
                dispatch(updateLastMessage(message.payload));
                console.log(chats);
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
    console.log("isChatView status: ", isChatView)

    async function setRead(id) //function to update in db that message are seen
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
        }
        catch(e)
        {
            console.log("Error while entering room:",e);
        }
    }

    function setViewAndManageMobile(value)
    {
        setview(value);
        (isPhone && value) ? setIsChatView(false): null;

    }

    


    
    

    return( <div className="w-full h-full">
        {isPhone ? (
            <div className="h-[90vh] w-full flex flex-col overflow-y-auto bg-[#05295e]">
                {
                isChatView ? 
                    <div className="w-full h-full bg-[#05295e]">
                    {chats.map((chat)=><motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px] scrollbar-hide ">
                                <button className="w-full, h-full flex justify-start px-[30px] gap-[15px]  hover:bg-white hover:opacity-15" onClick={()=>{ 
                                    setChat({id:chat.receiver[0]._id,setView:setViewAndManageMobile}); 
                                    setUserName(chat.receiver[0].userName);
                                    dispatch(setReceiverName(chat.receiver[0].userName))
                                    setRead(chat.chatID)
                                    enterRoom(chat.chatID,chat.receiver[0]._id);
                                    setIsChatView(false)
                                    }}> 
                                    <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                        <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                    </div>
                                    <div className="text-white text-[20px] my-auto flex flex-col justify-start">
                                        <h2 className="my-auto">{chat.receiver[0].userName}</h2>
                                        <div className="text-[14px] text-gray-400 text-left">
                                            {chat.lastMessage}
                                        </div>
                                    </div>
                        
                                </button>
                                <hr className="bg-blue-500 opacity-25"></hr>
                            </motion.div>)}

                    </div> : 
                        <div className="h-[80vh]  flex flex-col w-full">
                            {(view) ? <ChatElement  setview={setview} isPhone={isPhone}  socketRef={socketRef} setIsChatView={setIsChatView}/> : null}
                        </div>}
                    
            </div>
        ): (
            <div className="w-full h-full">
        <ResizablePanelGroup direction="horizontal"  className={`hidden md:flex min-h-[90vh] bg-[#05295e]  md:justify-between`}>
         <ResizablePanel defaultSize={45} minSize={38} maxSize={60}>
                 <div className="h-[90%] w-full flex flex-col overflow-y-auto">

                    {chats.map((chat)=><motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px] scrollbar-hide ">
                                <button className="w-full h-full flex justify-start px-[30px] gap-[15px] transition-all duration-200 rounded-[10px] hover:bg-[#0C4CAB]  hover:opacity-60" onClick={()=>{ 
                                    setChat({id:chat.receiver[0]._id,setView:setview}); 
                                    setUserName(chat.receiver[0].userName);
                                    dispatch(setReceiverName(chat.receiver[0].userName))
                                    setRead(chat.chatID)
                                    enterRoom(chat.chatID,chat.receiver[0]._id);
                                    }}> 
                                    <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                        <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                    </div>
                                    <div className="text-white text-[20px] my-auto flex flex-col justify-start">
                                        <h2 className="my-auto text-left">{chat.receiver[0].userName}</h2>
                                        <div className="text-[14px] text-gray-400 text-left ">
                                            {chat.lastMessage}
                                        </div>
                                    </div>
                        
                                </button>
                                <hr className="bg-blue-500 opacity-25"></hr>
                            </motion.div>)}
                 </div>

         </ResizablePanel>
        <ResizableHandle withHandle className="hidden md:flex" />
        <ResizablePanel defaultSize={55}  className="hidden md:flex md:hidden-handle">
        <div className="h-full  flex flex-col w-full">
            {(view) ? <ChatElement  setview={setview}  socketRef={socketRef} /> : null}
        </div>
        </ResizablePanel>
    </ResizablePanelGroup>
    
    </div>
        )}

    </div>
        
       
    )  
}

    function ChatElement({setview,isPhone,socketRef,setIsChatView}) 
    {  
    const isChatting = useSelector((state)=>state.chat.isChatting);
    const messages = useSelector((state)=>state.chat.messages);     
    const userID = useSelector((state) => state.authentication.userID);
    const userName = useSelector((state)=>state.chat.receiverName);
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const chatContainerRef = useRef(null);
    const [autoScroll, setAutoScroll] = useState(true);

    

    useEffect(() => {
        if (chatContainerRef.current && autoScroll) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

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
                dispatch(addMessage({ sender: userID, message: text, status:"sent" }));
            }
            setText("");
        } catch (e) {
            console.log("Error while sending message to websocket: ", e);
        }
    },[text,dispatch,userID]);

    const handleBackToList = () => {
        if (isPhone && setIsChatView) {
          setview(false);
          onExit();
          dispatch(setMessages([]));
          dispatch(setReceiverName(""));
          setIsChatView(true);
        }
      };

    return (
        <div className="w-full h-full flex flex-col">
            <ChatHeader userName={userName}  dispatch={dispatch} setview={setview} onExit={onExit} isPhone={isPhone}
        handleBackToList={handleBackToList}/>
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

const MessageList = React.memo(({ messages, userID, isChatting }) => {
    useEffect(()=>{

    },[isChatting])
    return messages.map((message, index) => (
        <div 
            key={index} 
            className={`${message.sender === userID ? "justify-end" : "justify-start"} flex`}
        >
            <MessageDiv message={message} userID = {userID} isChatting={isChatting}/>
        </div>
    ));
});

const ChatHeader = React.memo(({userName, dispatch, setview, onExit, isPhone, handleBackToList})=>{
    useEffect(()=>{

        return ()=>{
            onExit();
        }
    },[userName])

    return <div className="h-[10vh]  bg-blue-900 flex justify-between">
        
    <div className="flex flex-row justify-start gap-[20px] w-[90%] md:w-[80%] px-[40px]">
        <div className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] border-1 rounded-[50%] overflow-hidden my-auto ">
            <img src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D" className="w-full h-full object-cover border-[2px] border-cyello rounded-[50%] "/>
        </div>
        <div className="w-[80%] text-[16px] my-auto text-white  nmd:text-[28px]">
            {console.log("UserName:",userName)}
            {userName}
        </div>
    </div>
    {isPhone && (
            <Button  className="my-auto mx-10 bg-cyello"
              onClick={handleBackToList}
            >
              <ArrowRight />
            </Button>
          )}
    {!isPhone && <Button  className="my-auto mx-10 bg-cyello" onClick={()=>{
        setview(false);
        onExit();
        dispatch(setMessages([]));
        dispatch(setReceiverName(""))
        }}>
        <LogOut/>
    </Button>}
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

    
 const MessageDiv= React.memo(({message, userID,isChatting})=>
{
    useEffect(()=>{},[isChatting])
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


export function ChatElement2()
{
    return <></>

}


    

    



