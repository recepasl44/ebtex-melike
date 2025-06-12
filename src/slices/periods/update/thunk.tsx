import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PERIODS } from "../../../helpers/url_helper";
import { PeriodsUpdatePayload } from "../../../types/periods/update";
import { PeriodData } from "../../../types/periods/list";

export const updatePeriod = createAsyncThunk<PeriodData, PeriodsUpdatePayload>(
  "periods/updatePeriod",
  async ({ periodId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${PERIODS}/${periodId}`, payload);
      return resp.data.data as PeriodData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update period failed"
      );
    }
  }
);
