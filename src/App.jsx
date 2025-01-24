import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./global.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "./LogIn/Login";
import { Registration } from "./LogIn/Registration";

import { MainAdmin } from "./AdminSide/MainAdmin";
import { BookCreate } from "./AdminSide/BookCreate";
import { BookEdit } from "./AdminSide/BookEdit";

import { MainUser } from "./UserSide/MainUser";
import { BookLoanList } from "./UserSide/BookLoanList";
import { BookView } from "./UserSide/BookView";
import { BookViewWithoutPlusBtn } from "./UserSide/BookViewWithoutPlusBtn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/regist" element={<Registration></Registration>}></Route>

        <Route path="/books" element={<MainAdmin></MainAdmin>}></Route>
        <Route path="/create" element={<BookCreate></BookCreate>}></Route>
        <Route path="/edit/:id" element={<BookEdit></BookEdit>}></Route>
        
        <Route path="/books/:id" element={<MainUser></MainUser>}></Route>
        <Route path="/userbooks/:id" element={<BookLoanList></BookLoanList>}></Route>
        <Route path="/book/:id" element={<BookView></BookView>}></Route>
        <Route path="/currentbookuser/:id" element={<BookViewWithoutPlusBtn></BookViewWithoutPlusBtn>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
