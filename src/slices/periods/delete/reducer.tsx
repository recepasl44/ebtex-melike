import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePeriod } from "./thunk";
import { PeriodsDeleteState } from "../../../types/periods/delete";
import { PeriodsListStatus } from "../../../enums/periods/list";

const initialState: PeriodsDeleteState = {
  data: null,
  status: PeriodsListStatus.IDLE,
  error: null,
};

const periodsDeleteSlice = createSlice({
  name: "periodsDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePeriod.pending, (state) => {
        state.status = PeriodsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deletePeriod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deletePeriod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default periodsDeleteSlice.reducer;
