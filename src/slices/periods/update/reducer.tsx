import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatePeriod } from "./thunk";
import { PeriodsUpdateState } from "../../../types/periods/update";
import { PeriodsListStatus } from "../../../enums/periods/list";

const initialState: PeriodsUpdateState = {
  data: null,
  status: PeriodsListStatus.IDLE,
  error: null,
};

const periodsUpdateSlice = createSlice({
  name: "periodsUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePeriod.pending, (state) => {
        state.status = PeriodsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updatePeriod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updatePeriod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default periodsUpdateSlice.reducer;
