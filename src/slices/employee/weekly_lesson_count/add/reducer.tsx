
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addWeeklyLessonCount } from "./thunk";
import {

  WeeklyLessonCountAddState,
} from "../../../../types/employee/weekly_lesson_count/add";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";

const initialState: WeeklyLessonCountAddState = {
  data: null,
  status: WeeklyLessonCountListStatus.IDLE,
  error: null,
};

const weeklyLessonCountAddSlice = createSlice({
  name: "weeklyLessonCountAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWeeklyLessonCount.pending, (state) => {
        state.status = WeeklyLessonCountListStatus.LOADING;
        state.error = null;
      })
      .addCase(addWeeklyLessonCount.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addWeeklyLessonCount.rejected, (state, action: PayloadAction<any>) => {
        state.status = WeeklyLessonCountListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default weeklyLessonCountAddSlice.reducer;
