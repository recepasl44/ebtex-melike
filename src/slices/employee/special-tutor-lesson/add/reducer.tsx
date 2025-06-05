import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSpecialTutorLesson } from "./thunk";
import {
  SpecialTutorLessonAddState,

} from "../../../../types/employee/special_tutor_lesson/add";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";

const initialState: SpecialTutorLessonAddState = {
  data: null,
  status: SpecialTutorLessonListStatus.IDLE,
  error: null,
};

const specialTutorLessonAddSlice = createSlice({
  name: "specialTutorLessonAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSpecialTutorLesson.pending, (state) => {
        state.status = SpecialTutorLessonListStatus.LOADING;
        state.error = null;
      })
      .addCase(addSpecialTutorLesson.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SpecialTutorLessonListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addSpecialTutorLesson.rejected, (state, action: PayloadAction<any>) => {
        state.status = SpecialTutorLessonListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default specialTutorLessonAddSlice.reducer;
