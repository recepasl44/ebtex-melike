import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
 
    DailyDataItem,
  } from "../../../../types/employee/dailydata/list";

export const fetchDailyDataDetail = createAsyncThunk<
  DailyDataItem,
  number
>(
  "personel/dailyData/detail",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`/personel/daily-data/${id}`);
      return resp.data.data[0] as DailyDataItem;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch daily-data detail");
    }
  }
);
