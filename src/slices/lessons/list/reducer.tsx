import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLessons } from './thunk';
import { ListLessonsResponse } from '../../../types/lessons/list';
import { LessonsListStatus } from '../../../enums/lessons/list';

export interface LessonListState {
    data: ListLessonsResponse['data'] | null;
    links: ListLessonsResponse['links'] | null;
    meta: ListLessonsResponse['meta'] | null;
    status: LessonsListStatus;
    error: string | null;
}

const initialState: LessonListState = {
    data: null,
    links: null,
    meta: null,
    status: LessonsListStatus.IDLE,
    error: null,
};

const lessonListSlice = createSlice({
    name: 'lessons/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchLessons.pending, (state) => {
            state.status = LessonsListStatus.LOADING;
            state.error = null;
        });
        builder.addCase(fetchLessons.fulfilled, (state, action: PayloadAction<ListLessonsResponse>) => {
            state.status = LessonsListStatus.SUCCEEDED;
            state.data = action.payload.data;
            state.links = action.payload.links;
            state.meta = action.payload.meta;
        });
        builder.addCase(fetchLessons.rejected, (state, action: PayloadAction<any>) => {
            state.status = LessonsListStatus.FAILED;
            state.error = action.payload || 'Fetch lessons failed';
        });
    },
});

export default lessonListSlice.reducer;
