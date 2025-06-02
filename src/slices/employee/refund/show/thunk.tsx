import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { Refund } from "../../../../types/employee/refund/list";
import { REFUND_BASE } from "../../../../helpers/url_helper";

export const fetchRefundDetail = createAsyncThunk<
  Refund,
  number
>(
  "refund/fetchDetail",
  async (refundId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${REFUND_BASE}/${refundId}`);
      return resp.data.data as Refund;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch refund detail failed"
      );
    }
  }
);
