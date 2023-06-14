import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AddJobAPI,
  UpdateJobAPI,
  DeleteJobAPI,
  GetJobByRecruiterAPI,
  GetJobByIdAPI,
  ApplyJob,
  GetAppliedJobbyUser,
  GetJobApplicationbyRecruiter,
  UpdateStatus,
} from "../API";
import { toast } from "react-toastify";

const initialState = {
  job: [],
  loading: false,
  jobs: [],
  appliedjobs: [],
  message: "",
  error: null,
  is_update: false,
  is_deleted: false,
};

export const addJob = createAsyncThunk(
  "job/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await AddJobAPI(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateJob = createAsyncThunk(
  "job/update",
  async ({ id, Job }, { rejectWithValue }) => {
    try {
      const response = await UpdateJobAPI(id, Job);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/delete",
  async ({_id,dispatch}, { rejectWithValue }) => {
    try {
      dispatch(getJobbyrecruiter());
      const response = await DeleteJobAPI(_id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getJobbyrecruiter = createAsyncThunk(
  "job/jobbyrecruiter",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetJobByRecruiterAPI(page);
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
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const applyforJob = createAsyncThunk(
  "jobApply/apply",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await ApplyJob(data);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      return rejectWithValue(error.response);
    }
  }
);

export const getUserAppliedJob = createAsyncThunk(
  "jobApply/byuser",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetAppliedJobbyUser(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getRecruiterApplication = createAsyncThunk(
  "jobApply/byrecruiter",
  async (page, { rejectWithValue }) => {
    try {
      const response = await GetJobApplicationbyRecruiter(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const updateStatus = createAsyncThunk(
  "jobApply/updatestatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await UpdateStatus(id, status);
      if (response.data.toast) {
        
        console.log(response.data.message);
      }
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
      state.jobs.push(payload.job);
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
      state.is_update = true;
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
      state.is_deleted = true;
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
      state.length = null
    },
    [getJobbyrecruiter.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.jobs = payload.jobs;
      state.message = null;
      state.error = null;
      state.length = payload.length;
    },
    [getJobbyrecruiter.rejected]: (state, { payload }) => {
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
    [applyforJob.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    [applyforJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = null;
      toast.success("Applied successfully");
    },
    [applyforJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.appliedjobs = null;
      state.message = null;
      state.error = payload.error;
    },
    [getUserAppliedJob.pending]: (state) => {
      state.loading = true;
      state.appliedjobs = null;
      state.message = null;
      state.error = null;
      state.length = null;
    },
    [getUserAppliedJob.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appliedjobs = payload.applications;
      state.message = null;
      state.error = null;
      state.length = payload.length;
    },
    [getUserAppliedJob.rejected]: (state, { payload }) => {
      state.loading = false;
      state.job = null;
      state.message = null;
      state.error = payload.error;
    },
    [getRecruiterApplication.pending]: (state) => {
      state.loading = true;
      state.appliedjobs = null;
      state.message = null;
      state.error = null;
      state.length = null;
    },
    [getRecruiterApplication.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.appliedjobs = payload.applications;
      state.message = null;
      state.error = null;
      state.length = payload.length;
    },
    [getRecruiterApplication.rejected]: (state, { payload }) => {
      state.loading = false;
      state.job = null;
      state.message = null;
      state.error = payload.error;
    },
    [updateStatus.pending]: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
      state.is_update = false;
    },
    [updateStatus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.message = payload.message;
      state.error = null;
      state.is_update = true;
      toast.success("status update successfully");
    },
    [updateStatus.rejected]: (state, { payload }) => {
      state.loading = false;
      state.message = null;
      state.error = payload.error;
    },
  },
});
