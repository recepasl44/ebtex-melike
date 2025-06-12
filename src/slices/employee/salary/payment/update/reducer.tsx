// F:\xintra_react_ts\src\slices\employee\salary\payment\update\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatePayment } from "./thunk";
import { PaymentUpdateState } from "../../../../../types/employee/salary/payment/update";
import { PaymentListStatus } from "../../../../../enums/employee/salary/payment/list";

const initialState: PaymentUpdateState = {
  data: null,
  status: PaymentListStatus.IDLE,
  error: null,
};

const paymentUpdateSlice = createSlice({
  name: "salary/payment/update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePayment.pending, (state) => {
        state.status = PaymentListStatus.LOADING;
        state.error = null;
      })
      .addCase(updatePayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updatePayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default paymentUpdateSlice.reducer;
