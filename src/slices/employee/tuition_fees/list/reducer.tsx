import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TuitionFeesListState,

} from "../../../../types/employee/tuition_fees/list";
import { fetchTuitionFeesList } from "./thunk";
import TuitionFeesListStatus from "../../../../enums/employee/tuition_fees/list";

const initialState: TuitionFeesListState = {
  data: null,
  status: TuitionFeesListStatus.IDLE,
  error: null,
};

const tuitionFeesListSlice = createSlice({
  name: "tuitionFees/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTuitionFeesList.pending, (state) => {
        state.status = TuitionFeesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchTuitionFeesList.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = TuitionFeesListStatus.SUCCESS;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchTuitionFeesList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = TuitionFeesListStatus.ERROR;
          state.error = action.payload;
        }
      );
  },
});

export default tuitionFeesListSlice.reducer;
