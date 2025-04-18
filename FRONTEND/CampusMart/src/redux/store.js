
import UserReducer from './slices/UserSlice'
import ChatReducer from "./slices/ChatSlice"
import ServerReducer from "./slices/ServerSlice"
import { persistReducer, persistStore } from "redux-persist";
import authenticationReducer from "./slices/AuthSlice"
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";


const persistConfig = {
    key: "authentication", // Unique key for the slice
    storage,
    whitelist: ["authentication"], // Only persist authentication slice
  };

const persistAuthenticationReducer = persistReducer(persistConfig,authenticationReducer);



const store = configureStore({
    reducer:{
        authentication:persistAuthenticationReducer,
        user:UserReducer,
        chat:ChatReducer,
        server:ServerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // Ignore Redux Persist actions
            },
        }),
})

export const persistor = persistStore(store);
export default store;