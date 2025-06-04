import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";

export const deleteDailyData = createAsyncThunk<
  void,
  number
>(
  "personel/dailyData/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/personel/daily-data/${id}`);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to delete daily-data");
    }
  }
);
