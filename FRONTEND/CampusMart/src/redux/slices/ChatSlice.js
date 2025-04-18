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
            state.messages = state.messages.map((message)=>(message.status === 'sent') ? { ...message, status: 'seen' } : message)
            let chatIndex = state.chats.findIndex(chat => chat.chatID === action.payload.chatID);
            if(chatIndex!=-1)
            {
                if(action.payload.unreadMessages)
                {
                    state.chats[chatIndex].unreadMessages[action.payload.recieverID]+=1;
                }
            }
       
        },
        'updateLastMessage':(state,action)=>{
            let chatIndex = state.chats.findIndex(chat => chat.chatID === action.payload.chatID);
            console.log(chatIndex);
            if(chatIndex!=-1)
            {
                let updatedChat = state.chats[chatIndex]
                let notification = updatedChat.notification + 1;
                state.chats.splice(chatIndex,1)
                state.chats.unshift({...updatedChat,lastMessage:action.payload.lastMessage,notification:notification})
            }
        }    
    }
})

export const {setRoomID,setChats,setMessages,setReceiverName,setReceiverID,setChatID,addMessage,setIsChatting,updateMessage,updateLastMessage} = chatSlice.actions;
export default chatSlice.reducer;