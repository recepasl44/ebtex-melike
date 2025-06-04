// F:\xintra_react_ts\src\slices\employee\salary\payment\add\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPayment } from "./thunk";
import { PaymentAddState } from "../../../../../types/employee/salary/payment/add";
import PaymentListStatus from "../../../../../enums/employee/salary/payment/list";

const initialState: PaymentAddState = {
  data: null,
  status: PaymentListStatus.IDLE,
  error: null,
};

const paymentAddSlice = createSlice({
  name: "salary/payment/add",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPayment.pending, (state) => {
        state.status = PaymentListStatus.LOADING;
        state.error = null;
      })
      .addCase(addPayment.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addPayment.rejected, (state, action: PayloadAction<any>) => {
        state.status = PaymentListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default paymentAddSlice.reducer;
