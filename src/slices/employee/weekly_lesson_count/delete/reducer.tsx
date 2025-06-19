// F:\xintra_react_ts\src\slices\employee\weekly_lesson_count\delete\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteWeeklyLessonCount } from "./thunk";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";

interface WeeklyLessonCountDeleteState {
  data: number | null;
  status: WeeklyLessonCountListStatus;
  error: string | null;
}

const initialState: WeeklyLessonCountDeleteState = {
  data: null,
  status: WeeklyLessonCountListStatus.IDLE,
  error: null,
};

const weeklyLessonCountDeleteSlice = createSlice({
  name: "weeklyLessonCountDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteWeeklyLessonCount.pending, (state) => {
        state.status = WeeklyLessonCountListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteWeeklyLessonCount.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deleteWeeklyLessonCount.rejected, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default weeklyLessonCountDeleteSlice.reducer;
