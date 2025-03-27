import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomID: null,
    receiverID:null,
    isChatting: false,
    messages: [],
    chats:[],
    newmessages:[],
    receiverName:null
};

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        'setRoomID':(state,action)=>{
            state.roomID=action.payload.roomID;
            (action.payload.messages) ? state.messages = action.payload.messages : null; 
        },
        'setMessages':(state, action)=>{
            state.messages = action.payload.messages
        },
        'setChats':(state,action)=>{
            state.chats = action.payload;
        },
        'setReceiverID':(state,action)=>{
            state.receiverID = action.payload;
        },
        'addMessage':(state,action)=>{
            state.messages.push(action.payload);
            state.chats = state.chats.map((chat)=>(chat.chatID == action.payload.chatID) ? {...chat, lastMessage:action.payload.message} : chat)
        },
        'setIsChatting':(state,action)=>{
            state.isChatting = action.payload
        },
        'setReceiverName':(state,action)=>{
            state.receiverName = action.payload
        },
        'updateMessage':(state)=>{   
            state.messages = state.messages.map((message)=>(message.status === 'sent') ? { ...message, status: 'seen' } : message)
        },
        'updateLastMessage':(state,action)=>{
            state.chats = state.chats.map((chat)=>(chat.chatID == action.payload.chatID) ? { ...chat, lastMessage:action.payload.lastMessage} : chat)
        }    
    }
})

export const {setRoomID,setChats,setMessages,setReceiverName,setReceiverID,setChatID,addMessage,setIsChatting,updateMessage,updateLastMessage} = chatSlice.actions;
export default chatSlice.reducer;