import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSpecialTutorLessonDetail } from "./thunk";
import { SpecialTutorLesson } from "../../../../types/employee/special_tutor_lesson/list";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";

interface SpecialTutorLessonShowState {
  data: SpecialTutorLesson | null;
  status: SpecialTutorLessonListStatus;
  error: string | null;
}

const initialState: SpecialTutorLessonShowState = {
  data: null,
  status: SpecialTutorLessonListStatus.IDLE,
  error: null,
};

const specialTutorLessonShowSlice = createSlice({
  name: "specialTutorLesson/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialTutorLessonDetail.pending, (state) => {
        state.status = SpecialTutorLessonListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchSpecialTutorLessonDetail.fulfilled,
        (state, action: PayloadAction<SpecialTutorLesson>) => {
          state.status = SpecialTutorLessonListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchSpecialTutorLessonDetail.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = SpecialTutorLessonListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default specialTutorLessonShowSlice.reducer;
