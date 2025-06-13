import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTopic } from './thunk';
import { TopicShowState } from '../../../types/topics/detail';
import { TopicsListStatus } from '../../../enums/topics/list';

const initialState: TopicShowState = {
    data: null,
    status: TopicsListStatus.IDLE,
    error: null,
};

const topicShowSlice = createSlice({
    name: 'topicShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopic.pending, (state) => {
                state.status = TopicsListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchTopic.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = TopicsListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchTopic.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = TopicsListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default topicShowSlice.reducer;
