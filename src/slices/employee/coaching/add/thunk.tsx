import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CoachingAddPayload,
  CoachingAddResponse,
} from "../../../../types/employee/coaching/add";
import { COACHING_BASE } from "../../../../helpers/url_helper";

export const addCoaching = createAsyncThunk<
  CoachingAddResponse["data"], // success = coaching object
  CoachingAddPayload           // arg
>(
  "coaching/addCoaching",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${COACHING_BASE}`, payload);
      return resp.data.data; // Tekil coaching
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Add coaching failed");
    }
  }
);
