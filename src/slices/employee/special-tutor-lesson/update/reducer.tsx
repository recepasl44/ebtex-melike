import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateSpecialTutorLesson } from "./thunk";
import {
  SpecialTutorLessonUpdateResponse
} from "../../../../types/employee/special_tutor_lesson/update";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";

const initialState: SpecialTutorLessonUpdateResponse = {
  data: null,
  status: SpecialTutorLessonListStatus.IDLE,
  error: null,
};

const specialTutorLessonUpdateSlice = createSlice({
  name: "specialTutorLessonUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSpecialTutorLesson.pending, (state) => {
        state.status = SpecialTutorLessonListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateSpecialTutorLesson.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SpecialTutorLessonListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateSpecialTutorLesson.rejected, (state, action: PayloadAction<any>) => {
        state.status = SpecialTutorLessonListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default specialTutorLessonUpdateSlice.reducer;
