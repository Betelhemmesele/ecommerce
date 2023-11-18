//authAction.js

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, lastName, contact_number, location, email, password }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `http://localhost:3009/backend/users/register`,
                { firstName, lastName, contact_number, location, email, password },
                config
            )
            console.log('successfully registered')
        } catch (error) {
            // return custom error message from backend if present
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response  = await axios.post(
          `http://localhost:3009/backend/users/login`,
          { email, password },
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', response.data.token)
        // console.log(response);
        const user={
          email: email,
          id: response.data.id,
        }
        return {response, user}
      } catch (error) {
        // return custom error message from API if any
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

