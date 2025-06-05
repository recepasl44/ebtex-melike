import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateLesson } from './thunk';
import { LessonUpdateState } from '../../../types/lessons/update';
import { LessonsListStatus } from '../../../enums/lessons/list';

const initialState: LessonUpdateState = {
    data: null,
    status: LessonsListStatus.IDLE,
    error: null,
};

const lessonUpdateSlice = createSlice({
    name: 'lessonUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateLesson.pending, (state) => {
                state.status = LessonsListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateLesson.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = LessonsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateLesson.rejected, (state, action: PayloadAction<any>) => {
                state.status = LessonsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default lessonUpdateSlice.reducer;
