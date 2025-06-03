
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  RefundListResponse,
  RefundListArgs,
} from "../../../../types/employee/refund/list";
import { REFUND_BASE } from "../../../../helpers/url_helper";

export const fetchRefundList = createAsyncThunk<
  RefundListResponse,
  RefundListArgs,
  { rejectValue: string }
>(
  "refund/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const resp = await axiosInstance.get(`${REFUND_BASE}/index?${query.toString()}`);
      return resp.data as RefundListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch refund list failed"
      );
    }
  }
);
