import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourcesDeleteState } from '../../../types/sources/delete';
import SourcesListStatus from '../../../enums/sources/list';
import { deleteSource } from './thunk';

const initialState: SourcesDeleteState = {
    data: null,
    status: SourcesListStatus.IDLE,
    error: null,
};

const sourcesDeleteSlice = createSlice({
    name: 'sourcesDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSource.pending, (state) => {
                state.status = SourcesListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteSource.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SourcesListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteSource.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourcesListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default sourcesDeleteSlice.reducer;
