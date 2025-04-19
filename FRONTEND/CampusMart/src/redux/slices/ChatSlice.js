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
        'updateMessage':(state,action)=>{   
            console.log("Into the updaemesssage reducer")
            state.messages = state.messages.map((message)=>(message.status === 'sent') ? { ...message, status: 'seen' } : message)
            
       
        },
        'setread':(state,action)=>{
            console.log("entered setRead reducer.")
            const chatIndex = state.chats.findIndex(chat => chat.chatID === action.payload.chatID);
            if(state.chats[chatIndex].unreadMessages)
            {
                state.chats[chatIndex].unreadMessages[action.payload.sender] = 0;

            }
        },
        'updateLastMessage':(state,action)=>{
            let chatIndex = state.chats.findIndex(chat => chat.chatID === action.payload.chatID);
            console.log(chatIndex);
            if(chatIndex!=-1)
            {
                state.chats[chatIndex].unreadMessages[action.payload.recieverID]+=1;
                    console.log("Unread message count:", state.chats[chatIndex].unreadMessages[action.payload.recieverID]);
                let updatedChat = state.chats[chatIndex]
                state.chats.splice(chatIndex,1)
                state.chats.unshift({...updatedChat,lastMessage:action.payload.lastMessage})
            }
        }    
    }
})

export const {setRoomID,setChats,setMessages,setReceiverName,setReceiverID,setChatID,addMessage,setIsChatting,updateMessage,updateLastMessage,setread} = chatSlice.actions;
export default chatSlice.reducer;