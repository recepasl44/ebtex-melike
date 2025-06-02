import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCES } from "../../../../helpers/url_helper";

export const deleteExpence = createAsyncThunk<number, number>(
  "expence/deleteExpence",
  async (expenceId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${EXPENCES}/${expenceId}`);
      return expenceId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete expence failed"
      );
    }
  }
);
