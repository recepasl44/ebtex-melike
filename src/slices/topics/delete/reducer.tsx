import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteTopic } from './thunk';
import { TopicsDeleteState } from '../../../types/topics/delete';
import { TopicsListStatus } from '../../../enums/topics/list';

const initialState: TopicsDeleteState = {
    data: null,
    status: TopicsListStatus.IDLE,
    error: null,
};

const topicsDeleteSlice = createSlice({
    name: 'topicsDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTopic.pending, (state) => {
                state.status = TopicsListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteTopic.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = TopicsListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteTopic.rejected, (state, action: PayloadAction<any>) => {
                state.status = TopicsListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default topicsDeleteSlice.reducer;
