import { createSlice } from "@reduxjs/toolkit";
import {
   DailyDataListState
  } from "../../../../types/employee/dailydata/list";import { fetchDailyDataList } from "./thunk";

const initialState: DailyDataListState = {
  data: [],
  status: "idle",
  error: null,
};

const dailyDataListSlice = createSlice({
  name: "dailyDataList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyDataList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDailyDataList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDailyDataList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default dailyDataListSlice.reducer;
