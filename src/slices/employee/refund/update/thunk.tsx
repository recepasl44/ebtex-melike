// F:\xintra_react_ts\src\slices\employee\refund\update\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  RefundUpdatePayload,
  RefundUpdateState,
} from "../../../../types/employee/refund/update";
import { REFUND_BASE } from "../../../../helpers/url_helper";

export const updateRefund = createAsyncThunk<
  RefundUpdateState["data"],
  RefundUpdatePayload
>(
  "refund/update",
  async ({ refundId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${REFUND_BASE}/${refundId}`, payload);
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update refund failed"
      );
    }
  }
);
