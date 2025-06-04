// F:\xintra_react_ts\src\slices\employee\tuition_fees\show\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTuitionFeesDetail } from "./thunk";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";
import { TuitionFees } from "../../../../types/employee/tuition_fees/list";

interface TuitionFeesShowState {
  data: TuitionFees | null;
  status: TuitionFeesListStatus;
  error: string | null;
}

const initialState: TuitionFeesShowState = {
  data: null,
  status: TuitionFeesListStatus.IDLE,
  error: null,
};

const tuitionFeesShowSlice = createSlice({
  name: "tuitionFees/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTuitionFeesDetail.pending, (state) => {
        state.status = TuitionFeesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchTuitionFeesDetail.fulfilled,
        (state, action: PayloadAction<TuitionFees>) => {
          state.status = TuitionFeesListStatus.SUCCESS;
          state.data = action.payload;
        }
      )
      .addCase(fetchTuitionFeesDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = TuitionFeesListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default tuitionFeesShowSlice.reducer;
