import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchChapters } from './thunk';
import { ListChapterResponse } from '../../../types/chapters/list';
import { ChaptersListStatus } from '../../../enums/chapters/list';

export interface ChaptersListState {
    data: ListChapterResponse['data'] | null;
    links: ListChapterResponse['links'] | null;
    meta: ListChapterResponse['meta'] | null;
    status: ChaptersListStatus;
    error: string | null;
}

const initialState: ChaptersListState = {
    data: null,
    links: null,
    meta: null,
    status: ChaptersListStatus.IDLE,
    error: null,
};

const chaptersListSlice = createSlice({
    name: 'chapters/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChapters.pending, (state) => {
            state.status = ChaptersListStatus.LOADING;
            state.error = null;
        });
        builder.addCase(fetchChapters.fulfilled, (state, action: PayloadAction<ListChapterResponse>) => {
            state.status = ChaptersListStatus.SUCCEEDED;
            state.data = action.payload.data;
            state.links = action.payload.links;
            state.meta = action.payload.meta;
        });
        builder.addCase(fetchChapters.rejected, (state, action: PayloadAction<any>) => {
            state.status = ChaptersListStatus.FAILED;
            state.error = action.payload || 'Fetch chapters failed';
        });
    },
});

export default chaptersListSlice.reducer;
