// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\update\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  WeeklyLessonCountUpdatePayload,
  WeeklyLessonCountUpdateState,
} from "../../../../types/employee/weekly_lesson_count/update";
import { WEEKLY_LESSON_COUNT_BASE } from "../../../../helpers/url_helper";

export const updateWeeklyLessonCount = createAsyncThunk<
  WeeklyLessonCountUpdateState["data"],
  WeeklyLessonCountUpdatePayload
>(
  "weeklyLessonCount/update",
  async ({ weeklyLessonCountId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${WEEKLY_LESSON_COUNT_BASE}/${weeklyLessonCountId}`,
        payload
      );
      return resp.data.data; // Tekil WeeklyLessonCount
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update weekly lesson count failed"
      );
    }
  }
);
