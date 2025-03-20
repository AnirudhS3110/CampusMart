import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    roomID: null,
    receiverID:null,
    messages: [],
    chats:[],
    newmessages:[]
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
        },
        'setNewMessages':(state,action)=>{
            state.newmessages = action.payload;
        },
        
        
    }
})

export const {setRoomID,setChats,setMessages,setReceiverID,setChatID,addMessage,setNewMessages} = chatSlice.actions;
export default chatSlice.reducer;