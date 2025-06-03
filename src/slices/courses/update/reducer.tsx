import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCourse } from './thunk';
import { CoursesUpdateState } from '../../../types/courses/update';
import { CoursesListStatus } from '../../../enums/courses/list';

const initialState: CoursesUpdateState = {
  data: null,
  status: CoursesListStatus.IDLE,
  error: null,
};

const coursesUpdateSlice = createSlice({
  name: 'coursesUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCourse.pending, (state) => {
        state.status = CoursesListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CoursesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateCourse.rejected, (state, action: PayloadAction<any>) => {
        state.status = CoursesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default coursesUpdateSlice.reducer;