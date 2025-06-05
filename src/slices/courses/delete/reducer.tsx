import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCourse } from "./thunk";
import { CoursesDeleteState } from "../../../types/courses/delete";
import { CoursesListStatus } from "../../../enums/courses/list";

const initialState: CoursesDeleteState = {
  data: null,
  status: CoursesListStatus.IDLE,
  error: null,
};

const coursesDeleteSlice = createSlice({
  name: "coursesDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCourse.pending, (state) => {
        state.status = CoursesListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CoursesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteCourse.rejected, (state, action: PayloadAction<any>) => {
        state.status = CoursesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default coursesDeleteSlice.reducer;
