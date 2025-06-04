// F:\xintra_react_ts\src\slices\employee\refund\update\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateRefund } from "./thunk";
import { RefundUpdateState } from "../../../../types/employee/refund/update";
import RefundListStatus from "../../../../enums/employee/refund/list";

const initialState: RefundUpdateState = {
  data: null,
  status: RefundListStatus.IDLE,
  error: null,
};

const refundUpdateSlice = createSlice({
  name: "refundUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateRefund.pending, (state) => {
        state.status = RefundListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateRefund.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateRefund.rejected, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default refundUpdateSlice.reducer;
