import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { SaveDailyDataPayload } from "../../../../types/employee/dailydata/add";

export const addDailyData = createAsyncThunk<
  any,
  SaveDailyDataPayload
>(
  "personel/dailyData/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post("/personel/daily-data", payload);
      return resp.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add daily-data");
    }
  }
);
