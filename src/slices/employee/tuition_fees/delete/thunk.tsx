// F:\xintra_react_ts\src\slices\employee\tuition_fees\delete\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { TuitionFeesDeletePayload } from "../../../../types/employee/tuition_fees/delete";
import { TUITION_FEES_BASE } from "../../../../helpers/url_helper";

export const deleteTuitionFees = createAsyncThunk<
  TuitionFeesDeletePayload["data"],
  number
>(
  "tuitionFees/delete",
  async (tuitionFeesId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${TUITION_FEES_BASE}/${tuitionFeesId}`);
      return resp.data.data; // number or null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete tuition fees failed"
      );
    }
  }
);
