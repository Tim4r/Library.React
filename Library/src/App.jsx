import React from 'react'
import { BookList } from './BookList'
import { BookInfo } from './BookInfo'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import BookInfoForEdit from './BookInfoForEdit'
import { BookListUserSide } from './BookListUserSide'
import { BookListUser } from './BookListUser'
function App()
{
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<BookListUserSide></BookListUserSide>}></Route>
            <Route path='/create' element={<BookInfo></BookInfo>}></Route>
            <Route path="/edit/:id" element={<BookInfoForEdit></BookInfoForEdit>}></Route>
            <Route path="/userbooks" element={<BookListUser></BookListUser>}></Route>
        </Routes>
        </BrowserRouter>
    )
}

export default App