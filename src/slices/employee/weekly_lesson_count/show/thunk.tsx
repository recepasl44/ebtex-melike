// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\show\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { WeeklyLessonCount } from "../../../../types/employee/weekly_lesson_count/list";
import { WEEKLY_LESSON_COUNT_BASE } from "../../../../helpers/url_helper";

export const fetchWeeklyLessonCountDetail = createAsyncThunk<
  WeeklyLessonCount,
  number
>(
  "weeklyLessonCount/fetchDetail",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${WEEKLY_LESSON_COUNT_BASE}/${id}`);
      return resp.data.data[0] as WeeklyLessonCount;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch weekly lesson count detail failed"
      );
    }
  }
);
