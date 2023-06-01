import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddJobAPI,
  UpdateJobAPI,
  DeleteJobAPI,
  GetJobByRecruiterAPI,
} from "../API";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  jobs: null,
  message: null,
  error: null,
};

export const addJob = createAsyncThunk(
  "job/create",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await AddJobAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateJob = createAsyncThunk(
  "job/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await UpdateJobAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/delete",
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await DeleteJobAPI(jobId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getJobbyrecruiter = createAsyncThunk(
  "job/jobbyrecruiter",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetJobByRecruiterAPI();
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const jobSlice = createSlice({
  name: "job",
  initialState,
  extraReducers: {
    [addJob.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [addJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.jobs = payload.jobs;
      state.message = payload.message;
      state.error = null;
      toast.success("New job added successfully");
    },
    [addJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.jobs = null;
      state.message = null;
      state.error = payload.data.error;
    },
    [updateJob.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [updateJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.jobs = payload.data;
      state.message = payload.message;
      state.error = null;
      toast.success("New job added successfully");
    },
    [updateJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.jobs = null;
      state.message = null;
      state.error = payload.data.error;
    },
    [deleteJob.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
      toast.success("Job deleted successfully.");
    },
    [deleteJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.data.error;
    },
    [getJobbyrecruiter.pending]: (state) => {
      state.loading = true;
      state.jobs = null;
      state.message = null;
      state.error = null;
    },
    [getJobbyrecruiter.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.jobs = payload.jobs;
      state.message = null;
      state.error = null;
    },
    [getJobbyrecruiter.rejected]: (state, { payload }) => {
      state.loading = false;
      state.jobs = null;
      state.message = null;
      state.error = payload.data.error;
    },
  },
});
