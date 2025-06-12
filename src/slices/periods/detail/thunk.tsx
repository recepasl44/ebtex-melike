import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PERIODS } from "../../../helpers/url_helper";
import { PeriodsDetailState } from "../../../types/periods/detail";

export const fetchPeriod = createAsyncThunk<PeriodsDetailState, number>(
  "periods/fetchPeriod",
  async (periodId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${PERIODS}/${periodId}`);
      return resp.data.data as PeriodsDetailState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch period detail failed"
      );
    }
  }
);
