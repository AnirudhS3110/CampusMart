import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './slices/AuthSlice';
import UserReducer from './slices/UserSlice'
import ChatReducer from "./slices/ChatSlice"

const store = configureStore({
    reducer:{
        authentication:AuthReducer,
        user:UserReducer,
        chat:ChatReducer,
    }
})

export default store;