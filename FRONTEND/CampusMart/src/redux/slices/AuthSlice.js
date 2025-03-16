import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userID:null,
    userName:null,
    rollNumber : null,
    token :  null,
    isLoggedIn : true,
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
            localStorage.setItem('Authtoken',action.payload.token); 
        },
        'logout':(state)=>{
            state.rollNumber=null,
            state.isLoggedIn=false;
            state.token = null;
            localStorage.removeItem(token);
        }
    }


});

export const {login,logout} = AuthSlice.actions

export default AuthSlice.reducer;