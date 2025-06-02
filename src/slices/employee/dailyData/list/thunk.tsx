import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  DailyDataListArgs,
  DailyDataItem,
} from "../../../../types/employee/dailydata/list";

export const fetchDailyDataList = createAsyncThunk<
  DailyDataItem[],
  DailyDataListArgs
>(
  "personel/dailyData/list",
  async (params, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get("/personel/daily-data", { params });
      return resp.data.data as DailyDataItem[];
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch daily-data list");
    }
  }
);
