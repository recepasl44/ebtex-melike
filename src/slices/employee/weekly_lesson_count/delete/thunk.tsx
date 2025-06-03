// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\delete\thunk.tsx

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { WeeklyLessonCountDeletePayload } from "../../../../types/employee/weekly_lesson_count/delete";
import { WEEKLY_LESSON_COUNT_BASE } from "../../../../helpers/url_helper";

export const deleteWeeklyLessonCount = createAsyncThunk<
  WeeklyLessonCountDeletePayload["data"],
  number
>(
  "weeklyLessonCount/delete",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${WEEKLY_LESSON_COUNT_BASE}/${id}`);
      return resp.data.data; // number | null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete weekly lesson count failed"
      );
    }
  }
);
