import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addTopic } from './thunk';
import { TopicsAddState } from '../../../types/topics/add';
import { TopicsListStatus } from '../../../enums/topics/list';

const initialState: TopicsAddState = {
    data: null,
    status: TopicsListStatus.IDLE,
    error: null,
};

const topicsAddSlice = createSlice({
    name: 'topicsAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTopic.pending, (state) => {
                state.status = TopicsListStatus.LOADING;
                state.error = null;
            })
            .addCase(addTopic.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = TopicsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addTopic.rejected, (state, action: PayloadAction<any>) => {
                state.status = TopicsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default topicsAddSlice.reducer;
