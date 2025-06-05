// F:\xintra_react_ts\src\slices\employee\refund\add\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  RefundAddPayload,
  RefundAddState,
} from "../../../../types/employee/refund/add";
import { REFUND_BASE } from "../../../../helpers/url_helper";

export const addRefund = createAsyncThunk<
  RefundAddState["data"],
  RefundAddPayload
>(
  "refund/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${REFUND_BASE}`, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add refund failed"
      );
    }
  }
);
