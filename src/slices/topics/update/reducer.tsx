import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateTopic } from './thunk';
import { TopicsUpdateState } from '../../../types/topics/update';
import { TopicsListStatus } from '../../../enums/topics/list';

const initialState: TopicsUpdateState = {
    data: null,
    status: TopicsListStatus.IDLE,
    error: null,
};

const topicsUpdateSlice = createSlice({
    name: 'topicsUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateTopic.pending, (state) => {
                state.status = TopicsListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateTopic.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = TopicsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateTopic.rejected, (state, action: PayloadAction<any>) => {
                state.status = TopicsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default topicsUpdateSlice.reducer;
