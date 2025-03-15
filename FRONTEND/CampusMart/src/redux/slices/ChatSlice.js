import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomID: null,
    receiverID:null,
    messages: [],
    chats:[],
    sockets:null
};

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        'setRoomID':(state,action)=>{
            state.roomID=action.payload.roomID;
            (action.payload.messages) ? state.messages = (message)=>[...message,action.payload.messages] : null; 
        },
        'setMessages':(state, action)=>{
            state.messages = (message)=>[...message,action.payload.messages]
        },
        'setChats':(state,action)=>{
            state.chats = [(prev)=>[...prev,action.payload.chats]]
        },
        'setSocket':(state,action)=>{
            state.sockets = action.payload.socket;
            
        },
        'setReceiverID':(state,action)=>{
            state.receiverID = action.payload.id;
        },
        
        
    }
})

export const {setRoomID,setChats,setMessages,setSocket,setReceiverID,setChatID} = chatSlice.actions;
export default chatSlice.reducer;