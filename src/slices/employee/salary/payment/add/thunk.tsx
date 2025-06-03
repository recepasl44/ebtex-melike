// F:\xintra_react_ts\src\slices\employee\salary\payment\add\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import {
  PaymentAddPayload,
  PaymentAddState,
} from "../../../../../types/employee/salary/payment/add";
import { SALARY_PAYMENT_BASE } from "../../../../../helpers/url_helper";

export const addPayment = createAsyncThunk<
  PaymentAddState["data"],
  PaymentAddPayload
>(
  "salary/payment/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SALARY_PAYMENT_BASE}`, payload);
      return resp.data.data; // Tekil Payment
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add salary/payment failed"
      );
    }
  }
);
