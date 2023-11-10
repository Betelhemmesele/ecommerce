
"use client";
import { combineReducers, configureStore  } from "@reduxjs/toolkit";
import authReducer from '@/reduxSlices/UserSlice';
import productReducer from '@/reduxSlices/ProductSlice';
import modalReducer from '@/reduxSlices/ModalSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  modal: modalReducer
},);

export const store = configureStore({
  reducer: rootReducer,

 });
