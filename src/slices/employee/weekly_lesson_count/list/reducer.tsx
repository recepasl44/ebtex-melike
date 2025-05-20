// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\list\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeeklyLessonCountList } from "./thunk";
import {
  WeeklyLessonCountListResponse,
  WeeklyLessonCountListState,
} from "../../../../types/employee/weekly_lesson_count/list";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";

const initialState: WeeklyLessonCountListState = {
  data: null,
  status: WeeklyLessonCountListStatus.IDLE,
  error: null,
};

const weeklyLessonCountListSlice = createSlice({
  name: "weeklyLessonCount/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyLessonCountList.pending, (state) => {
        state.status = WeeklyLessonCountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchWeeklyLessonCountList.fulfilled,
        (state, action: PayloadAction<WeeklyLessonCountListResponse>) => {
          state.status = WeeklyLessonCountListStatus.SUCCESS;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchWeeklyLessonCountList.rejected, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.ERROR;
        state.error = action.payload || "Fetch weekly lesson count list failed";
      });
  },
});

export default weeklyLessonCountListSlice.reducer;
