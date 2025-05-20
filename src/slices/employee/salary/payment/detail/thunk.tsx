// F:\xintra_react_ts\src\slices\employee\salary\payment\show\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import { Payment } from "../../../../../types/employee/salary/payment/list";
import { SALARY_PAYMENT_BASE } from "../../../../../helpers/url_helper";

export const fetchPaymentDetail = createAsyncThunk<
  Payment,
  number
>(
  "salary/payment/fetchDetail",
  async (paymentId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SALARY_PAYMENT_BASE}/${paymentId}`);
      return resp.data.data[0] as Payment;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch salary/payment detail failed"
      );
    }
  }
);
