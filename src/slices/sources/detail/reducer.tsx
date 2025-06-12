import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SourcesListStatus from '../../../enums/sources/list';
import { SourcesDetailState } from '../../../types/sources/detail';
import { fetchSource } from './thunk';

const initialState: SourcesDetailState = {
    data: null,
    status: SourcesListStatus.IDLE,
    error: null,
};

const sourcesDetailSlice = createSlice({
    name: 'sourcesDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSource.pending, (state) => {
                state.status = SourcesListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchSource.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SourcesListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchSource.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourcesListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default sourcesDetailSlice.reducer;
