import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteLesson } from './thunk';
import { LessonDeleteState } from '../../../types/lessons/delete';
import { LessonsListStatus } from '../../../enums/lessons/list';

const initialState: LessonDeleteState = {
    data: null,
    status: LessonsListStatus.IDLE,
    error: null,
};

const lessonDeleteSlice = createSlice({
    name: 'lessonDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteLesson.pending, (state) => {
                state.status = LessonsListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteLesson.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = LessonsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteLesson.rejected, (state, action: PayloadAction<any>) => {
                state.status = LessonsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default lessonDeleteSlice.reducer;
