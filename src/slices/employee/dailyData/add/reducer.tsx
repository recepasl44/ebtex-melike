import { createSlice } from "@reduxjs/toolkit";
import { DailyDataAddState } from "../../../../types/employee/dailydata/add";
import { addDailyData } from "./thunk";

const initialState: DailyDataAddState = {
  data: null,
  status: "idle",
  error: null,
};

const dailyDataAddSlice = createSlice({
  name: "dailyDataAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addDailyData.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addDailyData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addDailyData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default dailyDataAddSlice.reducer;
