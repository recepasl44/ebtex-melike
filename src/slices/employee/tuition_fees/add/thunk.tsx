// F:\xintra_react_ts\src\slices\employee\tuition_fees\add\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  TuitionFeesAddPayload,
  TuitionFeesAddState,
} from "../../../../types/employee/tuition_fees/add";
import { TUITION_FEES_BASE } from "../../../../helpers/url_helper";

export const addTuitionFees = createAsyncThunk<
  TuitionFeesAddState["data"],
  TuitionFeesAddPayload
>(
  "tuitionFees/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${TUITION_FEES_BASE}`, payload);
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add tuition fees failed"
      );
    }
  }
);
