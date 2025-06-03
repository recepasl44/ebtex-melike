import { createSlice } from "@reduxjs/toolkit";
import { DailyDataDeleteState } from "../../../../types/employee/dailydata/delete";
import { deleteDailyData } from "./thunk";

const initialState: DailyDataDeleteState = {
  status: "idle",
  error: null,
};

const dailyDataDeleteSlice = createSlice({
  name: "dailyDataDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteDailyData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteDailyData.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteDailyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default dailyDataDeleteSlice.reducer;
