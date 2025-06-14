import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTopics } from './thunk';
import { ListTopicResponse } from '../../../types/topics/list';
import { TopicsListStatus } from '../../../enums/topics/list';

export interface TopicsListState {
    data: ListTopicResponse['data'] | null;
    links: ListTopicResponse['links'] | null;
    meta: ListTopicResponse['meta'] | null;
    status: TopicsListStatus;
    error: string | null;
}

const initialState: TopicsListState = {
    data: null,
    links: null,
    meta: null,
    status: TopicsListStatus.IDLE,
    error: null,
};

const topicsListSlice = createSlice({
    name: 'topics/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTopics.pending, (state) => {
            state.status = TopicsListStatus.LOADING;
            state.error = null;
        });
        builder.addCase(fetchTopics.fulfilled, (state, action: PayloadAction<ListTopicResponse>) => {
            state.status = TopicsListStatus.SUCCEEDED;
            state.data = action.payload.data;
            state.links = action.payload.links;
            state.meta = action.payload.meta;
        });
        builder.addCase(fetchTopics.rejected, (state, action: PayloadAction<any>) => {
            state.status = TopicsListStatus.FAILED;
            state.error = action.payload || 'Fetch topics failed';
        });
    },
});

export default topicsListSlice.reducer;
