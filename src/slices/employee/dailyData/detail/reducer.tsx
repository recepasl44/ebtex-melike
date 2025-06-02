import { createSlice } from "@reduxjs/toolkit";
import { DailyDataDetailState } from "../../../../types/employee/dailydata/detail";
import { fetchDailyDataDetail } from "./thunk";

const initialState: DailyDataDetailState = {
  data: null,
  status: "idle",
  error: null,
};

const dailyDataDetailSlice = createSlice({
  name: "dailyDataDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyDataDetail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchDailyDataDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchDailyDataDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default dailyDataDetailSlice.reducer;
