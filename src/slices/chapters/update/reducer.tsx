import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateChapter } from './thunk';
import { ChaptersUpdateState } from '../../../types/chapters/update';
import { ChaptersListStatus } from '../../../enums/chapters/list';

const initialState: ChaptersUpdateState = {
    data: null,
    status: ChaptersListStatus.IDLE,
    error: null,
};

const chaptersUpdateSlice = createSlice({
    name: 'chaptersUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateChapter.pending, (state) => {
                state.status = ChaptersListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateChapter.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ChaptersListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateChapter.rejected, (state, action: PayloadAction<any>) => {
                state.status = ChaptersListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default chaptersUpdateSlice.reducer;
