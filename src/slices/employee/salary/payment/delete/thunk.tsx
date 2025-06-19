// F:\xintra_react_ts\src\slices\employee\salary\payment\delete\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import { PaymentDeleteState } from "../../../../../types/employee/salary/payment/delete";
import { SALARY_PAYMENT_BASE } from "../../../../../helpers/url_helper";

export const deletePayment = createAsyncThunk<
  PaymentDeleteState["data"],
  number
>(
  "salary/payment/delete",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SALARY_PAYMENT_BASE}/${id}`);
      return resp.data.data; // number | null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete salary/payment failed"
      );
    }
  }
);
