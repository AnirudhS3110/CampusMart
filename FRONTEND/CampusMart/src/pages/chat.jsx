import React, { useCallback, useEffect,useMemo , useRef, useState} from "react";
import { Rocket, ArrowLeft, ArrowRight ,MessageSquare, SearchIcon  } from "lucide-react";
import { LogOut } from "lucide-react";
import axios from "axios";
import { motion } from "framer-motion";
import { setChatID,setread, setChats, setRoomID , setReceiverID, setMessages, addMessage,setIsChatting, setReceiverName, updateMessage, updateLastMessage} from "@/redux/slices/ChatSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ChatElement } from "@/components/ChatPage/chatElement";
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
    const [Chats,setchats] = useState(chats)
    const messages = useSelector((state)=>state.chat.messages)
    const dispatch =  useDispatch();
    const socketRef = useRef(null);
    const nav = useNavigate()
    const [isPhone,setIsPhone] = useState(window.innerWidth <= 768); 
    const [isChatView,setIsChatView] = useState(true);
    useEffect(()=>{
        setchats(chats);
    },[chats])

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
            else if(message.type == "left")
            {
                dispatch(setIsChatting(false))
            }
            else if(message.type == "notify")
            {
                console.log("MEssage came from backend")
                dispatch(updateLastMessage(message.payload));
                console.log("Chats:",chats);
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
    // console.log("isChatView status: ", isChatView)

    async function setRead(id) //function to update in db that message are seen
    {
        try{
            console.log("into teh set read fn in chat.jsx")
            dispatch(setread({chatID:id,sender:userID}));
            const response = await axios.post('http://localhost:3000/chats/setRead',{
                chatID:id,
                receiver:userID,
                sender:userID
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
                    <div className="w-full h-full flex flex-col bg-[#05295e]">
                        <SearchBar chats={chats} setchats={setchats}/>
                    {Chats.map((chat)=><motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px] scrollbar-hide ">
                                <button className="w-full h-full flex justify-between items-center px-[30px] gap-[15px]  hover:bg-white hover:opacity-15" onClick={()=>{ 
                                    setChat({id:chat.receiver[0]._id,setView:setViewAndManageMobile}); 
                                    setUserName(chat.receiver[0].userName);
                                    dispatch(setReceiverName(chat.receiver[0].userName))
                                    setRead(chat.chatID)
                                    enterRoom(chat.chatID,chat.receiver[0]._id);
                                    setIsChatView(false)
                                    }}> 
                                    <div className="w-full h-full flex gap-[15px]">
                                    <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                        <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                    </div>
                                    <div className="text-white text-[20px] my-auto flex flex-col justify-start">
                                        <h2 className="my-auto text-left">{chat.receiver[0].userName}</h2>
                                        <div className="text-[14px] text-gray-400 text-left min-w-[250px]max-w-[300px]">
                                            {chat.lastMessage}
                                        </div>
                                    </div>
                                    </div>
                                    <div>
                                    <div className={`h-[30px] w-[30px] text-[14px] rounded-full flex justify-center items-center bg-cblue text-white ${chat.unreadMessages?.[userID] ? "block" : "hidden"}`}>
                                        {chat.unreadMessages?.[userID]}
                                    </div>
                                    </div>
                        
                                </button>
                                <hr className="bg-blue-500 opacity-25"></hr>
                            </motion.div>)}

                    </div> : 
                        <div className="h-full  flex flex-col w-full">
                            {(view) ? <ChatElement  setview={setview} isPhone={isPhone}  socketRef={socketRef} setIsChatView={setIsChatView}/> : null}
                        </div>}
                    
            </div>
        ): (
            <div className="w-full h-[90vh] ">
        <ResizablePanelGroup direction="horizontal"  className={`hidden md:flex min-h-[90vh] bg-[#05295e]  md:justify-between`}>
         <ResizablePanel defaultSize={45} minSize={38} maxSize={60}>
                 <div className="h-[90%] w-full flex flex-col overflow-y-auto">
                    <SearchBar chats={chats} setchats={setchats}/>

                    {Chats.map((chat)=><motion.div whileTap={{ scale: 1.03 }} className="w-full h-[60px] scrollbar-hide ">
                                <button className="w-full h-full flex justify-between items-center px-[30px] gap-[15px] transition-all duration-200 rounded-[10px] hover:bg-[#0C4CAB]  hover:opacity-60" onClick={()=>{ 
                                    setChat({id:chat.receiver[0]._id,setView:setview}); 
                                    setUserName(chat.receiver[0].userName);
                                    dispatch(setReceiverName(chat.receiver[0].userName))
                                    setRead(chat.chatID)
                                    enterRoom(chat.chatID,chat.receiver[0]._id);
                                    }}> 
                                    <div className="w-full h-full flex gap-[15px]">
                                    <div className="h-[40px] w-[40px] border-[1px] border-cyello rounded-[50%] my-auto">
                                        <img className="border-[1px] rounded-[50%] object-cover w-full h-full"/>
                                    </div>
                                    <div className="text-white text-[20px] my-auto flex flex-col justify-start">
                                        <h2 className="my-auto text-left">{chat.receiver[0].userName}</h2>
                                        <div className="text-[14px] text-gray-400 text-left ">
                                            {chat.lastMessage}
                                        </div>
                                    </div>
                                    </div>

                                    <div className={`h-[30px] w-[30px] text-[14px] rounded-full flex justify-center items-center bg-cblue text-white ${chat.unreadMessages?.[userID] ? "block" : "hidden"}`}>
                                        {chat.unreadMessages?.[userID]}
                                    </div>

                        
                                </button>
                                <hr className="bg-blue-500 opacity-25"></hr>
                            </motion.div>)}
                 </div>

         </ResizablePanel>
        <ResizableHandle withHandle={false} className="hidden md:flex" />
        <ResizablePanel defaultSize={55}  className="hidden md:flex ">
        <div className="h-full  flex flex-col w-full ">
            {(view) ? <ChatElement  setview={setview}  socketRef={socketRef} /> : <EmptyChatPanel/>}
        </div>
        </ResizablePanel>
    </ResizablePanelGroup>
    
    </div>
        )}

    </div>
        
       
    )  
}

const SearchBar = ({chats,setchats})=>{
    const [search,setSearch] = useState("")

    useEffect(()=>{
        function searchChat()
        {
            if(search!='')
            {
                console.log("chats: ",chats.filter((chat)=>chat.receiver[0].userName.toLowerCase().includes(search.toLowerCase())));
                setchats(chats.filter((chat)=>chat.receiver[0].userName.toLowerCase().includes(search.toLowerCase())))
            }
            else
            {
                setchats(chats);
            }
        }
        searchChat()
    },[search])

    return <div className="w-full h-[10vh] flex items-center px-[25px] shadow-sm">
  <div className="relative flex items-center w-full max-w-[100%px] mx-auto">
    <div className="absolute left-4 text-gray-400">
      <SearchIcon className="w-4 h-4" />
    </div>
    <input 
      type="text" 
      placeholder="Search Chat" 
      value={search} 
      onChange={(e) => setSearch(e.target.value)} 
      className="bg-white px-[40px] py-[8px] w-full rounded-[20px] shadow-sm focus:outline-none  focus:ring-blue-500 transition-all"
    />
    
  </div>
</div>
}

const EmptyChatPanel = () => {
   return <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <MessageSquare size={60} className="text-blue-300 mb-4" />
      <h3 className="text-white text-xl font-medium mb-2">No chat selected</h3>
      <p className="text-blue-300">Select a conversation from the list to start chatting</p>
    </div>
  };

    


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




    



