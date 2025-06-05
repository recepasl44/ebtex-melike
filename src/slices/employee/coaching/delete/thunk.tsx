import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { CoachingDeleteState } from "../../../../types/employee/coaching/delete";
import { COACHING_BASE } from "../../../../helpers/url_helper";

export const deleteCoaching = createAsyncThunk<
  CoachingDeleteState["data"], // Tekil Coaching | null
  number
>(
  "coaching/deleteCoaching",
  async (coachingId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${COACHING_BASE}/${coachingId}`);
      return resp.data.data; // or null
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Delete coaching failed");
    }
  }
);
