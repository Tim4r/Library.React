import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BookList } from './BookList';
import { Login } from './Login';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import BooksReducer from './BooksReducer';
import UserLibraryReducer from './UserLibraryReducer';
const store = configureStore({
  reducer:{
    books:BooksReducer,
    userBooks:UserLibraryReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
<App></App>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
