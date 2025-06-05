// F:\xintra_react_ts\src\slices\employee\refund\delete\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { RefundDeleteState } from "../../../../types/employee/refund/delete";
import { REFUND_BASE } from "../../../../helpers/url_helper";

export const deleteRefund = createAsyncThunk<
  RefundDeleteState["data"],
  number
>(
  "refund/delete",
  async (refundId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${REFUND_BASE}/${refundId}`);
      return resp.data.data; // number | null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete refund failed"
      );
    }
  }
);
