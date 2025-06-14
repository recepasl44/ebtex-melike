import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSpecialTutorLessonList } from "./thunk";
import {
  SpecialTutorLessonListState,
  SpecialTutorLessonListResponse,
} from "../../../../types/employee/special_tutor_lesson/list";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";

const initialState: SpecialTutorLessonListState = {
  data: null,
  status: SpecialTutorLessonListStatus.IDLE,
  error: null,
};

const specialTutorLessonListSlice = createSlice({
  name: "specialTutorLesson/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialTutorLessonList.pending, (state) => {
        state.status = SpecialTutorLessonListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchSpecialTutorLessonList.fulfilled,
        (state, action: PayloadAction<SpecialTutorLessonListResponse>) => {
          state.status = SpecialTutorLessonListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchSpecialTutorLessonList.rejected, (state, action: PayloadAction<any>) => {
        state.status = SpecialTutorLessonListStatus.FAILED;
        state.error = action.payload || "Fetch special tutor lesson list failed";
      });
  },
});

export default specialTutorLessonListSlice.reducer;
