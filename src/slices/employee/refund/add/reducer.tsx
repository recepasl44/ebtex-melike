// F:\xintra_react_ts\src\slices\employee\refund\add\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addRefund } from "./thunk";
import { RefundAddState } from "../../../../types/employee/refund/add";
import RefundListStatus from "../../../../enums/employee/refund/list";

const initialState: RefundAddState = {
  data: null,
  status: RefundListStatus.IDLE,
  error: null,
};

const refundAddSlice = createSlice({
  name: "refundAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRefund.pending, (state) => {
        state.status = RefundListStatus.LOADING;
        state.error = null;
      })
      .addCase(addRefund.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addRefund.rejected, (state, action: PayloadAction<any>) => {
        state.status = RefundListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default refundAddSlice.reducer;
