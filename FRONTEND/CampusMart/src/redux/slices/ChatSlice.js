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
            (action.payload.messages) ? state.messages = action.payload.messages : null; 
        },
        'setMessages':(state, action)=>{
            state.messages = action.payload.messages
        },
        'setChats':(state,action)=>{
            state.chats = action.payload;
        },
        'setSocket':(state,action)=>{
            state.sockets = action.payload;
            
        },
        'setReceiverID':(state,action)=>{
            state.receiverID = action.id;
        },
        'addMessage':(state,action)=>{
            state.messages.push(action.payload);
        },
        
        
    }
})

export const {setRoomID,setChats,setMessages,setSocket,setReceiverID,setChatID,addMessage} = chatSlice.actions;
export default chatSlice.reducer;