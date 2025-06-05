import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCourse } from './thunk';
import { CoursesAddState } from '../../../types/courses/add';
import { CoursesListStatus } from '../../../enums/courses/list';

const initialState: CoursesAddState = {
  data: null,
  status: CoursesListStatus.IDLE,
  error: null,
};
const courseAddSlice = createSlice({
  name: 'courseAdd',
  initialState,
  reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(addCourse.pending, (state) => {
            state.status = CoursesListStatus.LOADING;
            state.error = null;
        })
        .addCase(addCourse.fulfilled, (state, action: PayloadAction<any>) => {
            state.status = CoursesListStatus.SUCCEEDED;
            state.data = action.payload;
        })
        .addCase(addCourse.rejected, (state, action: PayloadAction<any>) => {
            state.status = CoursesListStatus.FAILED;
            state.error = action.payload;
        });
    },
});
export default courseAddSlice.reducer;