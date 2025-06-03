
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  WeeklyLessonCountAddPayload,
  WeeklyLessonCountAddState,
} from "../../../../types/employee/weekly_lesson_count/add";
import { WEEKLY_LESSON_COUNT_BASE } from "../../../../helpers/url_helper";

export const addWeeklyLessonCount = createAsyncThunk<
  WeeklyLessonCountAddState["data"],
  WeeklyLessonCountAddPayload
>(
  "weeklyLessonCount/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${WEEKLY_LESSON_COUNT_BASE}`, payload);
      return resp.data.data; // Tekil WeeklyLessonCount
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add weekly lesson count failed"
      );
    }
  }
);
