// F:\xintra_react_ts\src\slices\employee\tuition_fees\update\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateTuitionFees } from "./thunk";
import { TuitionFeesUpdateState } from "../../../../types/employee/tuition_fees/update";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";

const initialState: TuitionFeesUpdateState = {
  data: null,
  status: TuitionFeesListStatus.IDLE,
  error: null,
};

const tuitionFeesUpdateSlice = createSlice({
  name: "tuitionFeesUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTuitionFees.pending, (state) => {
        state.status = TuitionFeesListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateTuitionFees.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = TuitionFeesListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateTuitionFees.rejected, (state, action: PayloadAction<any>) => {
        state.status = TuitionFeesListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default tuitionFeesUpdateSlice.reducer;
