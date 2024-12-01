import { createSlice } from "@reduxjs/toolkit";

const initialState=
{
    token:'12345'
}
export const tokenSliceUser = createSlice({
    name:"tokenUser",
    initialState,
    reducers:{
        setUserToken:(state,action)=>
        {
            state.token = action.payload;
        },
    }
})
export const {setUserToken} = tokenSliceUser.actions;
export default tokenSliceUser.reducer;