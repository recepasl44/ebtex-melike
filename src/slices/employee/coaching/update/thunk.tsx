import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CoachingUpdatePayload,
  CoachingUpdateResponse,
} from "../../../../types/employee/coaching/update";
import { COACHING_BASE } from "../../../../helpers/url_helper";

export const updateCoaching = createAsyncThunk<
  CoachingUpdateResponse["data"], // Tekil coaching
  CoachingUpdatePayload
>(
  "coaching/updateCoaching",
  async ({ coachingId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${COACHING_BASE}/${coachingId}`, payload);
      return resp.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Update coaching failed");
    }
  }
);
    