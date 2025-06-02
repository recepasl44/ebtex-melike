import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCourse} from './thunk';
import {CourseShowState} from '../../../types/courses/detail';
import {CoursesListStatus} from '../../../enums/courses/list';

const initialState: CourseShowState = {
  data: null,
  status: CoursesListStatus.IDLE,
  error: null,
};

const courseShowSlice = createSlice({
  name: 'courseShow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourse.pending, (state) => {
        state.status = CoursesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCourse.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = CoursesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchCourse.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = CoursesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default courseShowSlice.reducer;