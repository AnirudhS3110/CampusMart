import { createSlice } from "@reduxjs/toolkit";

const initialState= {localhost: null}

const serverSlice  = createSlice({
    name:"server",
    initialState,
    reducers:{
        'setLocalHost':(state,action)=>{
            state.localhost = action.payload.ip;
        }
    }
})

export const {setLocalHost} = serverSlice.actions;
export default serverSlice.reducer;