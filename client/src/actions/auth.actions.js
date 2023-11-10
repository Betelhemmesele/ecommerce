//authAction.js

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const registerUser = createAsyncThunk(
    'auth/register',
    async ({ firstName, lastName, contactNumber, email, password }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(
                `${process.env.REACT_APP_BASEURL}/api/user/register`,
                { firstName, lastName, contactNumber, email, password },
                config
            )
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
        const { data } = await axios.post(
          `${backendURL}/api/user/login`,
          { email, password },
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', data.userToken)
        return data
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

