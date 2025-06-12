import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { UpdateDailyDataPayload } from "../../../../types/employee/dailydata/update";

export const updateDailyData = createAsyncThunk<
  any,
  UpdateDailyDataPayload
>(
  "personel/dailyData/update",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put("/personel/daily-data", payload);
      return resp.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update daily-data");
    }
  }
);
