// F:\xintra_react_ts\src\slices\employee\tuition_fees\add\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTuitionFees } from "./thunk";
import { TuitionFeesAddState } from "../../../../types/employee/tuition_fees/add";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";

const initialState: TuitionFeesAddState = {
  data: null,
  status: TuitionFeesListStatus.IDLE,
  error: null,
};

const tuitionFeesAddSlice = createSlice({
  name: "tuitionFeesAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTuitionFees.pending, (state) => {
        state.status = TuitionFeesListStatus.LOADING;
        state.error = null;
      })
      .addCase(addTuitionFees.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = TuitionFeesListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addTuitionFees.rejected, (state, action: PayloadAction<any>) => {
        state.status = TuitionFeesListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default tuitionFeesAddSlice.reducer;
