import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username:null,
    likedListings:[],
    userListing:[],
    boughtListing:[]
}

const UserSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        'setUser':(state,action)=>{
            state.username = action.action.username;
            state.likedListings = action.action.likedListings;
            state.userListing = action.action.userListing;
            state.boughtListing = action.action.boughtListing;
        },

    }
});

export const {setUser} = UserSlice.actions;
export default UserSlice.reducer;