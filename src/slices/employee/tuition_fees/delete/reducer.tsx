// F:\xintra_react_ts\src\slices\employee\tuition_fees\delete\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTuitionFees } from "./thunk";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";

interface TuitionFeesDeleteState {
  data: number | null;
  status: TuitionFeesListStatus;
  error: string | null;
}

const initialState: TuitionFeesDeleteState = {
  data: null,
  status: TuitionFeesListStatus.IDLE,
  error: null,
};

const tuitionFeesDeleteSlice = createSlice({
  name: "tuitionFeesDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTuitionFees.pending, (state) => {
        state.status = TuitionFeesListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteTuitionFees.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = TuitionFeesListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deleteTuitionFees.rejected, (state, action: PayloadAction<any>) => {
        state.status = TuitionFeesListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default tuitionFeesDeleteSlice.reducer;
