import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  UserRegisterAPI,
  UserLoginAPI,
  UserLogoutAPI,
  RecruiterRegisterAPI,
  RecruiterLoginAPI,
  RecruiterLogoutAPI,
  UserForgotPassword,
  UserResetPassword,
  ChangePassword,
} from "../API";

const initialState = {
  profile: null,
  token: null,
  loading: false,
  role: "",
  error: null,
};

export const signUpUser = createAsyncThunk(
  "user/register",
  async ({ user, navigate }, { rejectWithValue }) => {
    try {
      const response = await UserRegisterAPI(user);
      navigate("/jobs");
      return response.data;
    } catch (error) {
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
      toast.error(error.response.data.message);
      return rejectWithValue(error.response);
    }
  }
);

export const userforgotPassword = createAsyncThunk(
  "user/forgotpassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await UserForgotPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changepassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ChangePassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userresetPassword = createAsyncThunk(
  "user/resetpassword",
  async ({ navigate, resettoken, data }, { rejectWithValue }) => {
    try {
      const response = await UserResetPassword(resettoken, data);
      navigate("/login");
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
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const signUpRecruiter = createAsyncThunk(
  "recruiter/register",
  async ({ recruiter, navigate }, { rejectWithValue }) => {
    try {
      const response = await RecruiterRegisterAPI(recruiter);
      navigate("/dashboard");
      return response.data;
    } catch (error) {
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
      toast.error(error.response.data.message);
      return rejectWithValue(error.response);
    }
  }
);

export const logoutRecruiter = createAsyncThunk(
  "recruiter/logout",
  async ({ navigate }, { rejectWithValue }) => {
    try {
      const response = await RecruiterLogoutAPI();
      navigate("/login");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
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
      toast.success("User Signup successfully");
    },
    [signUpUser.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
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
      toast.success("User Login successfully");
    },
    [signInUser.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
      toast.error(state.error);
    },
    [userforgotPassword.pending]: (state) => {
      state.message = null;
      state.loading = true;
    },
    [userforgotPassword.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.loading = false;
      toast.success(state.message);
    },
    [userforgotPassword.rejected]: (state, { payload }) => {
      state.message = payload.data.message;
      state.loading = false;
      toast.error(state.message);
    },
    [changePassword.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [changePassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      toast.success(payload.message);
    },
    [changePassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      toast.error(payload.message);
    },
    [userresetPassword.pending]: (state) => {
      state.message = null;
      state.loading = true;
    },
    [userresetPassword.fulfilled]: (state, { payload }) => {
      state.message = payload.message;
      state.loading = false;
      toast.success(state.message);
    },
    [userresetPassword.rejected]: (state, { payload }) => {
      state.message = payload.data.message;
      state.loading = false;
      state.error = payload;
      toast.error(state.message);
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
      toast.success("Recruiter Signup successfully");
    },
    [signUpRecruiter.rejected]: (state, { payload }) => {
      state.profile = null;
      state.token = null;
      state.loading = false;
      state.error = payload.data.error;
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
      toast.success("Recruiter Login successfully");
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
