import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetJobByFilter } from "../API";

const initialState = {
  jobs: [],
  loading: false,
  message: "",
  error: null,
  //   title: "",
  //   category: "",
  //   salary: "",
};

export const filterData = createAsyncThunk(
  "job/getjobs",
  async ({ title, category, salary }, { rejectWithValue }) => {
    try {
      const response = await GetJobByFilter({ title, category, salary });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log("ssdsd", error);
      return rejectWithValue(error);
    }
  }
);


export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // setTitle: (state, action) => {
    //   state.title = action.payload;
    // },
    // setCategory: (state, action) => {
    //   state.category = action.payload;
    // },
    // setSalary: (state, action) => {
    //   state.salary = action.payload;
    // },
  },
  extraReducers: {
    [filterData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [filterData.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.jobs = payload.jobs;
      state.message = false;
      state.error = null;
    },
    [filterData.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    },
  },
});

export const { setTitle, setCategory, setSalary } = searchSlice.actions;
