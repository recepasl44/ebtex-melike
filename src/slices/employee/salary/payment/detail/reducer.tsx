// F:\xintra_react_ts\src\slices\employee\salary\payment\show\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPaymentDetail } from "./thunk";
import { Payment } from "../../../../../types/employee/salary/payment/list";
import PaymentListStatus from "../../../../../enums/employee/salary/payment/list";

interface PaymentShowState {
  data: Payment | null;
  status: PaymentListStatus;
  error: string | null;
}

const initialState: PaymentShowState = {
  data: null,
  status: PaymentListStatus.IDLE,
  error: null,
};

const paymentShowSlice = createSlice({
  name: "salary/payment/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentDetail.pending, (state) => {
        state.status = PaymentListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchPaymentDetail.fulfilled,
        (state, action: PayloadAction<Payment>) => {
          state.status = PaymentListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(fetchPaymentDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default paymentShowSlice.reducer;
