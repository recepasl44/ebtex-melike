// F:\xintra_react_ts\src\slices\employee\tuition_fees\show\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { TuitionFees } from "../../../../types/employee/tuition_fees/list";
import { TUITION_FEES_BASE } from "../../../../helpers/url_helper";

export const fetchTuitionFeesDetail = createAsyncThunk<
  TuitionFees,
  number
>(
  "tuitionFees/fetchDetail",
  async (tuitionFeesId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${TUITION_FEES_BASE}/${tuitionFeesId}`);
      return resp.data.data[0] as TuitionFees;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch tuition fees detail failed"
      );
    }
  }
);
