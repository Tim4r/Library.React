import { createSlice } from "@reduxjs/toolkit";
import ящерка from './ящерка.png'
const initialState=
{
    libraryItems:[
    ],
}
const booksSliceUser = createSlice({
    name:"userBooks",
    initialState,
    reducers:{
        addToLoans:(state,action)=>
        {
            state.libraryItems.push(action.payload);
        },
    }
})
export const {deleteBookFromLoans,addToLoans} = booksSliceUser.actions;
export default booksSliceUser.reducer;