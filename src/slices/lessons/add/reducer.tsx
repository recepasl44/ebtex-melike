import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addLesson } from './thunk';
import { LessonAddState } from '../../../types/lessons/add';
import { LessonsListStatus } from '../../../enums/lessons/list';

const initialState: LessonAddState = {
    data: null,
    status: LessonsListStatus.IDLE,
    error: null,
};

const lessonAddSlice = createSlice({
    name: 'lessonAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addLesson.pending, (state) => {
                state.status = LessonsListStatus.LOADING;
                state.error = null;
            })
            .addCase(addLesson.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = LessonsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addLesson.rejected, (state, action: PayloadAction<any>) => {
                state.status = LessonsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default lessonAddSlice.reducer;
