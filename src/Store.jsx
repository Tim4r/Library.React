import { configureStore } from '@reduxjs/toolkit';
import tokenUserReducer from './tokenSlice';
import filteredDataReducer  from './dataSlice';
export const store = configureStore({
    reducer:{
        userToken: tokenUserReducer,
        filteredData: filteredDataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false,
        }),
})