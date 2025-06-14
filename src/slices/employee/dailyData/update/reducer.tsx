import { createSlice } from "@reduxjs/toolkit";
import { DailyDataUpdateState } from "../../../../types/employee/dailydata/update";
import { updateDailyData } from "./thunk";

const initialState: DailyDataUpdateState = {
  status: "idle",
  error: null,
};

const dailyDataUpdateSlice = createSlice({
  name: "dailyDataUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDailyData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateDailyData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateDailyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default dailyDataUpdateSlice.reducer;
