// F:\xintra_react_ts\src\slices\employee\tuition_fees\update\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  TuitionFeesUpdatePayload,
  TuitionFeesUpdateState,
} from "../../../../types/employee/tuition_fees/update";
import { TUITION_FEES_BASE } from "../../../../helpers/url_helper";

export const updateTuitionFees = createAsyncThunk<
  TuitionFeesUpdateState["data"],
  TuitionFeesUpdatePayload
>(
  "tuitionFees/update",
  async ({ tuitionFeesId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${TUITION_FEES_BASE}/${tuitionFeesId}`, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update tuition fees failed"
      );
    }
  }
);
