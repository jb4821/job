import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddJobAPI,
  UpdateJobAPI,
  DeleteJobAPI,
  GetJobByRecruiterAPI,
  GetAllJobAPI,
  GetJobByIdAPI,
} from "../API";
import { toast } from "react-toastify";

const initialState = {
  job: null,
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
  async ({id, Job}, { rejectWithValue }) => {
    try {
      const response = await UpdateJobAPI(id,Job);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/delete",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await DeleteJobAPI(_id);
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

      console.log("fdfs", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getAllJob = createAsyncThunk(
  "job/alljob",
  async (_, { rejectWithValue }) => {
    try {
      const response = await GetAllJobAPI();

      console.log("ds", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getJobbyid = createAsyncThunk(
  "job/jobbyid",
  async (id, { rejectWithValue }) => {
    try {
      const response = await GetJobByIdAPI(id);
      console.log("ds", response.data);
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
      state.jobs = payload.job;
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
      state.job = payload.Job;
      state.message = payload.message;
      state.error = null;
      toast.success("job update successfully");
    },
    [updateJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.job = null;
      state.message = null;
      state.error = payload.Job.error;
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
      // state.length = payload.job;
    },
    [getJobbyrecruiter.rejected]: (state, { payload }) => {
      state.loading = false;
      state.jobs = null;
      state.message = null;
      state.error = payload.data.error;
    },
    [getAllJob.pending]: (state) => {
      state.loading = true;
      state.jobs = null;
      state.message = null;
      state.error = null;
    },
    [getAllJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.jobs = payload.job;
      state.message = null;
      state.error = null;
    },
    [getAllJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.jobs = null;
      state.message = null;
      state.error = payload.data.error;
    },
    [getJobbyid.pending]: (state) => {
      state.loading = true;
      state.job = null;
      state.message = null;
      state.error = null;
    },
    [getJobbyid.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.job = payload.jobs;
      state.message = null;
      state.error = null;
    },
    [getJobbyid.rejected]: (state, { payload }) => {
      state.loading = false;
      state.job = null;
      state.message = null;
      state.error = payload.data.error;
    },
  },
});
