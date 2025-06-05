import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPeriod } from "./thunk";
import { PeriodsDetailState } from "../../../types/periods/detail";
import { PeriodsListStatus } from "../../../enums/periods/list";

const initialState: PeriodsDetailState = {
  data: null,
  status: PeriodsListStatus.IDLE,
  error: null,
};

const periodDetailSlice = createSlice({
  name: "periodDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeriod.pending, (state) => {
        state.status = PeriodsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchPeriod.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchPeriod.rejected, (state, action: PayloadAction<any>) => {
        state.status = PeriodsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default periodDetailSlice.reducer;
