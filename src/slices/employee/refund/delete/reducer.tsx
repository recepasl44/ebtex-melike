// F:\xintra_react_ts\src\slices\employee\refund\delete\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteRefund } from "./thunk";
import RefundListStatus from "../../../../enums/employee/refund/list";

interface RefundDeleteInternalState {
  data: number | null;
  status: RefundListStatus;
  error: string | null;
}

const initialState: RefundDeleteInternalState = {
  data: null,
  status: RefundListStatus.IDLE,
  error: null,
};

const refundDeleteSlice = createSlice({
  name: "refundDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteRefund.pending, (state) => {
        state.status = RefundListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteRefund.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deleteRefund.rejected, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default refundDeleteSlice.reducer;
