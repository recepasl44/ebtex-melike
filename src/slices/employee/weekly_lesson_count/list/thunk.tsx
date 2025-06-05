// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\list\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  WeeklyLessonCountListResponse,
  WeeklyLessonCountListArgs,
} from "../../../../types/employee/weekly_lesson_count/list";
import { WEEKLY_LESSON_COUNT_BASE } from "../../../../helpers/url_helper";

export const fetchWeeklyLessonCountList = createAsyncThunk<
  WeeklyLessonCountListResponse,
  WeeklyLessonCountListArgs
>(
  "weeklyLessonCount/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const resp = await axiosInstance.get(
        `${WEEKLY_LESSON_COUNT_BASE}/index?${query.toString()}`
      );
      return resp.data as WeeklyLessonCountListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch weekly lesson count list failed"
      );
    }
  }
);
