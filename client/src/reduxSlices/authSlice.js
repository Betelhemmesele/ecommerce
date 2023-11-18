
"use client";

// features/auth/authSlice.js
import { registerUser, userLogin } from '@/actions/auth.actions'
import { createSlice } from '@reduxjs/toolkit'
import localStorage from 'redux-persist/es/storage';

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null



const initialState = {
  loading: false,
  userInfo: "", // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('userToken')
      // clear the auth slice data
      return {};
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload.user;
        state.userToken = payload.token;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
     
  },
})

export const { logout, updateUserInfo } = authSlice.actions;
export default authSlice.reducer
