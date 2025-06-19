import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCourses} from './thunk';
import {ListCourseResponse} from '../../../types/courses/list';
import {CoursesListStatus} from '../../../enums/courses/list';

export interface CourseListState {
  data: ListCourseResponse['data'] | null;
  links: ListCourseResponse['links'] | null;
  meta: ListCourseResponse['meta'] | null;
  status: CoursesListStatus;
  error: string | null;
}

const initialState: CourseListState = {
  data: null,
  links: null,
  meta: null,
  status: CoursesListStatus.IDLE,
  error: null,
};

const courseListSlice = createSlice({
  name: 'courses/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourses.pending, (state) => {
      state.status = CoursesListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchCourses.fulfilled, (state, action: PayloadAction<ListCourseResponse>) => {
      state.status = CoursesListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchCourses.rejected, (state, action: PayloadAction<any>) => {
      state.status = CoursesListStatus.FAILED;
      state.error = action.payload || 'Fetch courses failed';
    });
  },
});

export default courseListSlice.reducer;