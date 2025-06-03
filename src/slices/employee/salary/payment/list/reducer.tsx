// F:\xintra_react_ts\src\slices\employee\salary\payment\list\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  PaymentListResponse,
  PaymentState,
} from "../../../../../types/employee/salary/payment/list";
import { fetchPaymentList } from "./thunk";
import PaymentListStatus from "../../../../../enums/employee/salary/payment/list";

const initialState: PaymentState = {
  data: null,
  status: PaymentListStatus.IDLE,
  error: null,
};

const paymentListSlice = createSlice({
  name: "salary/payment/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentList.pending, (state) => {
        state.status = PaymentListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchPaymentList.fulfilled,
        (state, action: PayloadAction<PaymentListResponse>) => {
          state.status = PaymentListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchPaymentList.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.FAILED;
        state.error = action.payload || "Fetch salary/payment list failed";
      });
  },
});

export default paymentListSlice.reducer;
