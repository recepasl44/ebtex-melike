import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { PERIODS } from "../../../helpers/url_helper";
import { PeriodsAddPayload } from "../../../types/periods/add";
import { PeriodData } from "../../../types/periods/list";

export const addPeriod = createAsyncThunk<PeriodData, PeriodsAddPayload>(
  "periods/addPeriod",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(PERIODS, payload);
      return resp.data.data as PeriodData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add period failed"
      );
    }
  }
);
