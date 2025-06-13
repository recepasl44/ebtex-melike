// F:\xintra_react_ts\src\slices\employee\salary\payment\update\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import {
  PaymentUpdatePayload,
  PaymentUpdateState,
} from "../../../../../types/employee/salary/payment/update";
import { SALARY_PAYMENT_BASE } from "../../../../../helpers/url_helper";

export const updatePayment = createAsyncThunk<
  PaymentUpdateState["data"],
  PaymentUpdatePayload
>(
  "salary/payment/update",
  async ({ paymentId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${SALARY_PAYMENT_BASE}/${paymentId}`, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update salary/payment failed"
      );
    }
  }
);
