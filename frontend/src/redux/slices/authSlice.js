import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  UserRegisterAPI,
  UserLoginAPI,
  UserLogoutAPI,
  RecruiterRegisterAPI,
  RecruiterLoginAPI,
  RecruiterLogoutAPI,
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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(rejectWithValue(error.response));
      return rejectWithValue(error.response);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signin",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await UserLoginAPI(user);
      navigate("/jobs");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await UserLogoutAPI();
      console.log(response.data);
      navigate("/login");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const signUpRecruiter = createAsyncThunk(
  "recruiter/register",
  async ({ recruiter, navigate }, { rejectWithValue }) => {
    try {
      console.log(Object.fromEntries(recruiter));
      const response = await RecruiterRegisterAPI(recruiter);
      navigate("/dashboard");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(rejectWithValue(error.response.data));
      return rejectWithValue(error.response);
    }
  }
);

export const signInRecruiter = createAsyncThunk(
  "recruiter/signin",
  async ({ recruiter, navigate }, { rejectWithValue }) => {
    try {
      const response = await RecruiterLoginAPI(recruiter);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutRecruiter = createAsyncThunk(
  "recruiter/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await RecruiterLogoutAPI();
      console.log(response.data);
      navigate("/login");
      return response.data;
    } catch (error) {
      console.log(error);
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
    [signInUser.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signInUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "user";
      localStorage.setItem("token", payload.token);
    },
    [signInUser.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      toast.error(state.error);
    },
    [logoutUser.fulfilled]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.role = null;
      localStorage.clear();
    },

    //recruiter

    [signUpRecruiter.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signUpRecruiter.fulfilled]: (state, { payload }) => {
      state.profile = payload.recruiter;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "recruiter";
      localStorage.setItem("token", payload.token);
    },
    [signUpRecruiter.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      console.log(state.error);
      toast.error(state.error);
    },
    [signInRecruiter.pending]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = true;
      state.error = null;
    },
    [signInRecruiter.fulfilled]: (state, { payload }) => {
      state.profile = payload.recruiter;
      state.token = payload.token;
      state.loading = false;
      state.error = null;
      state.role = "recruiter";
      localStorage.setItem("token", payload.token);
    },
    [signInRecruiter.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      toast.error(state.error);
    },
    [logoutRecruiter.fulfilled]: (state) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.role = null;
      localStorage.clear();
    },
  },
});
