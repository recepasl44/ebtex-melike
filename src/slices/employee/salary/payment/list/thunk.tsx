import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../../services/axiosClient";
import {
  PaymentListResponse,
  PaymentListArgs,
} from "../../../../../types/employee/salary/payment/list";
import { SALARY_PAYMENT_BASE } from "../../../../../helpers/url_helper";

export const fetchPaymentList = createAsyncThunk<
  PaymentListResponse,
  PaymentListArgs
>(
  "salary/payment/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const resp = await axiosInstance.get(
        `${SALARY_PAYMENT_BASE}/index?${query.toString()}`
      );
      return resp.data as PaymentListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch salary/payment list failed"
      );
    }
  }
);
