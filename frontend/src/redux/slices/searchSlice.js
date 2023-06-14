import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetJobByFilter } from "../API";

const initialState = {
  jobs: [],
  loading: false,
  message: "",
  error: null,
};

export const filterData = createAsyncThunk(
  "job/alljob",
  async ({ title, category, salary, page }, { rejectWithValue }) => {
    try {
      const response = await GetJobByFilter({ title, category, salary, page });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  extraReducers: {
    [filterData.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.length = null;
    },
    [filterData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.jobs = payload.jobs;
      state.message = false;
      state.error = null;
      state.length = payload.length;
    },
    [filterData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
      state.jobs = [];
    },
  },
});
