import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  TuitionFeesListState,
  TuitionFeesListArgs,
} from "../../../../types/employee/tuition_fees/list";
import { TUITION_FEES_BASE } from "../../../../helpers/url_helper";

export const fetchTuitionFeesList = createAsyncThunk<
  TuitionFeesListState,
  TuitionFeesListArgs
>(
  "tuitionFees/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const resp = await axiosInstance.get(
        `${TUITION_FEES_BASE}/index?${query.toString()}`
      );
      return resp.data as TuitionFeesListState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch tuition fees list failed"
      );
    }
  }
);
