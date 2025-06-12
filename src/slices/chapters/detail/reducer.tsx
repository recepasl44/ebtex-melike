import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchChapter } from './thunk';
import { ChapterShowState } from '../../../types/chapters/detail';
import { ChaptersListStatus } from '../../../enums/chapters/list';

const initialState: ChapterShowState = {
    data: null,
    status: ChaptersListStatus.IDLE,
    error: null,
};

const chapterShowSlice = createSlice({
    name: 'chapterShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapter.pending, (state) => {
                state.status = ChaptersListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchChapter.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = ChaptersListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchChapter.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = ChaptersListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default chapterShowSlice.reducer;
