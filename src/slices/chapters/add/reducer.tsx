import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addChapter } from './thunk';
import { ChaptersAddState } from '../../../types/chapters/add';
import { ChaptersListStatus } from '../../../enums/chapters/list';

const initialState: ChaptersAddState = {
    data: null,
    status: ChaptersListStatus.IDLE,
    error: null,
};

const chaptersAddSlice = createSlice({
    name: 'chaptersAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addChapter.pending, (state) => {
                state.status = ChaptersListStatus.LOADING;
                state.error = null;
            })
            .addCase(addChapter.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ChaptersListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addChapter.rejected, (state, action: PayloadAction<any>) => {
                state.status = ChaptersListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default chaptersAddSlice.reducer;
