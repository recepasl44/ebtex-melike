import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteSpecialTutorLesson } from "./thunk";
import { SpecialTutorLessonDeleteState } from "../../../../types/employee/special_tutor_lesson/delete";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";

const initialState: SpecialTutorLessonDeleteState = {
  data: null,
  status: SpecialTutorLessonListStatus.IDLE,
  error: null,
};

const specialTutorLessonDeleteSlice = createSlice({
  name: "specialTutorLessonDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSpecialTutorLesson.pending, (state) => {
        state.status = SpecialTutorLessonListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteSpecialTutorLesson.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SpecialTutorLessonListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteSpecialTutorLesson.rejected, (state, action: PayloadAction<any>) => {
        state.status = SpecialTutorLessonListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default specialTutorLessonDeleteSlice.reducer;
