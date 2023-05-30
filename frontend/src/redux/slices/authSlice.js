import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
 
  UserRegisterAPI,
  
} from "../API";

const initialState = {
    profile: null,
    token: null,
    loading: false,
    error: null,
};

export const signUpUser = createAsyncThunk(
  "user/register",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await UserRegisterAPI(user);
      navigate("/jobs");
      console.log(response.data)
      return response.data;
    } catch (error) {
        console.log(rejectWithValue(error.response));
      return rejectWithValue(error.response);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [signUpUser.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "user";
      localStorage.setItem("token", payload.token);
    },
    [signUpUser.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      console.log(state.error);
      toast.error(state.error);
    },
  },
});