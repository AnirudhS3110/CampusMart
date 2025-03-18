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
                state.username = action.payload.username;
                state.likedListings = action.payload.likedListings;
                state.userListing = action.payload.userListing;
                state.boughtListing = action.payload.boughtListings;

            },
            'setUserListing':(state,action)=>{
                state.userListing = (action.payload.userListing) ? action.payload.userListing : [];
            },

        }
    });

export const {setUser, setUserListing} = UserSlice.actions;
export default UserSlice.reducer;