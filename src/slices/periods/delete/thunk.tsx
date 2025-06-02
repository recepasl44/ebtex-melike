import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PERIODS } from "../../../helpers/url_helper";
import { PeriodsDeleteState } from "../../../types/periods/delete";

export const deletePeriod = createAsyncThunk<PeriodsDeleteState, number>(
  "periods/deletePeriod",
  async (periodId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${PERIODS}/${periodId}`);
      return resp.data as PeriodsDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete period failed"
      );
    }
  }
);
