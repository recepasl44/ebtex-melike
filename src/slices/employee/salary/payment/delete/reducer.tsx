// F:\xintra_react_ts\src\slices\employee\salary\payment\delete\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePayment } from "./thunk";
import { PaymentListStatus } from "../../../../../enums/employee/salary/payment/list";

interface PaymentDeleteInternalState {
  data: number | null;
  status: PaymentListStatus;
  error: string | null;
}

const initialState: PaymentDeleteInternalState = {
  data: null,
  status: PaymentListStatus.IDLE,
  error: null,
};

const paymentDeleteSlice = createSlice({
  name: "salary/payment/delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePayment.pending, (state) => {
        state.status = PaymentListStatus.LOADING;
        state.error = null;
      })
      .addCase(deletePayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deletePayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default paymentDeleteSlice.reducer;
