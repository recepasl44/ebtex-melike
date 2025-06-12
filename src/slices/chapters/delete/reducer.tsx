import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteChapter } from './thunk';
import { ChaptersDeleteState } from '../../../types/chapters/delete';
import { ChaptersListStatus } from '../../../enums/chapters/list';

const initialState: ChaptersDeleteState = {
    data: null,
    status: ChaptersListStatus.IDLE,
    error: null,
};

const chaptersDeleteSlice = createSlice({
    name: 'chaptersDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteChapter.pending, (state) => {
                state.status = ChaptersListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteChapter.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ChaptersListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteChapter.rejected, (state, action: PayloadAction<any>) => {
                state.status = ChaptersListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default chaptersDeleteSlice.reducer;
