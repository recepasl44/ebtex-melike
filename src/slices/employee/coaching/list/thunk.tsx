import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  CoachingListResponse,
  CoachingListArgs,
} from "../../../../types/employee/coaching/list";
import { COACHING_BASE } from "../../../../helpers/url_helper"; 

export const fetchCoachingList = createAsyncThunk<
  CoachingListResponse,
  CoachingListArgs
>(
  "coaching/fetchCoachingList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      // Örnek: `${COACHING_BASE}/index?${query}`
      const response = await axiosInstance.get(
        `${COACHING_BASE}/index?${query.toString()}`
      );
      return response.data as CoachingListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch coaching list failed"
      );
    }
  }
);
