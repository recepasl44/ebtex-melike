import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLesson } from './thunk';
import { LessonShowState } from '../../../types/lessons/detail';
import { LessonsListStatus } from '../../../enums/lessons/list';

const initialState: LessonShowState = {
    data: null,
    status: LessonsListStatus.IDLE,
    error: null,
};

const lessonShowSlice = createSlice({
    name: 'lessonShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLesson.pending, (state) => {
                state.status = LessonsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchLesson.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = LessonsListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchLesson.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = LessonsListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default lessonShowSlice.reducer;
    