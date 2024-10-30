import { createSlice } from "@reduxjs/toolkit";
import { bookDatas } from "./Data";

export const booksSlice = createSlice({
    name:"books",
    initialState:bookDatas,
    reducers:{
        addBook:(state,action)=>
        {
            console.log(action)
            state.push(action.payload)
        },
        updateBook:(state,action)=>
        {
            const {id,title,description,authorid,categoryid,isbn,img}=action.payload;
            const uu = state.find(book => book.id == id);
            if(uu)
            {
                uu.title=title;
                uu.description=description;
                uu.authorid=authorid;
                uu.categoryid=categoryid;
                uu.isbn=isbn;
                uu.img=img;
            }
        },

        deleteBook:(state,action)=>
        {
            const {id} = action.payload;
            const uu = state.find(book => book.id == id);
            if(uu)
            {
                return state.filter(f=>f.id !== id);
            }
        }
    }
})
export const {addBook,updateBook,deleteBook,addToLoans} = booksSlice.actions;
export default booksSlice.reducer;