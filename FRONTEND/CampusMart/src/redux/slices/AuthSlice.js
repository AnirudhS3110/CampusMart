import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userID:null,
    userName:null,
    rollNumber : null,
    token :  null,
    isLoggedIn : false,
}

const AuthSlice = createSlice({
    name:"authentication",
    initialState,
    reducers:{
        'login':(state,action)=>{
            state.userID = action.payload.userID;
            state.userName = action.payload.userName;
            state.rollNumber = action.payload.rollNumber;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        'logout':(state)=>{
            state.rollNumber=null,
            state.isLoggedIn=false;
            state.token = null;
        }
    }


});

export const {login,logout} = AuthSlice.actions

export default AuthSlice.reducer;