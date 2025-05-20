import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { Coaching } from "../../../../types/employee/coaching/list";
import { COACHING_BASE } from "../../../../helpers/url_helper";

export const fetchCoachingDetail = createAsyncThunk<
  Coaching, // Tekil Coaching döneceğim
  number    // Arg: coachingId
>(
  "coaching/fetchCoachingDetail",
  async (coachingId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${COACHING_BASE}/${coachingId}`);
      return resp.data.data as Coaching;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch coaching detail failed"
      );
    }
  }
);
