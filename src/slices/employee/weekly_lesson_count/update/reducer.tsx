// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\update\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateWeeklyLessonCount } from "./thunk";
import {
  WeeklyLessonCountUpdateState,
} from "../../../../types/employee/weekly_lesson_count/update";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";

const initialState: WeeklyLessonCountUpdateState = {
  data: null,
  status: WeeklyLessonCountListStatus.IDLE,
  error: null,
};

const weeklyLessonCountUpdateSlice = createSlice({
  name: "weeklyLessonCountUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateWeeklyLessonCount.pending, (state) => {
        state.status = WeeklyLessonCountListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateWeeklyLessonCount.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateWeeklyLessonCount.rejected, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default weeklyLessonCountUpdateSlice.reducer;
