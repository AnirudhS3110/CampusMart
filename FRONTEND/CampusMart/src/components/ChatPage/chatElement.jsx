import React, { useCallback, useEffect,useMemo , useRef, useState} from "react";
import { Rocket, ArrowLeft, ArrowRight } from "lucide-react";
import { LogOut } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { setChatID, setChats, setRoomID , setReceiverID, setMessages, addMessage,setIsChatting, setReceiverName, updateMessage, updateLastMessage} from "@/redux/slices/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import store from "@/redux/store";
import {CheckCheck} from "lucide-react";

export function ChatElement({setview,isPhone,socketRef,setIsChatView}) 
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
            {/* <img src="" className="w-full h-full object-cover border-[2px] border-cyello rounded-[50%] "/> */}
        </div>
        <div className="w-[80%] text-[16px] my-auto text-white  nmd:text-[28px]">
            {/* {console.log("UserName:",userName)} */}
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



