// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\show\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeeklyLessonCountDetail } from "./thunk";
import { WeeklyLessonCount } from "../../../../types/employee/weekly_lesson_count/list";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";

interface WeeklyLessonCountShowState {
  data: WeeklyLessonCount | null;
  status: WeeklyLessonCountListStatus;
  error: string | null;
}

const initialState: WeeklyLessonCountShowState = {
  data: null,
  status: WeeklyLessonCountListStatus.IDLE,
  error: null,
};

const weeklyLessonCountShowSlice = createSlice({
  name: "weeklyLessonCount/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyLessonCountDetail.pending, (state) => {
        state.status = WeeklyLessonCountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchWeeklyLessonCountDetail.fulfilled,
        (state, action: PayloadAction<WeeklyLessonCount>) => {
          state.status = WeeklyLessonCountListStatus.SUCCESS;
          state.data = action.payload;
        }
      )
      .addCase(fetchWeeklyLessonCountDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default weeklyLessonCountShowSlice.reducer;
