import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourceTypesDeleteState } from '../../../types/sourceTypes/delete';
import SourceTypesListStatus from '../../../enums/sourceTypes/list';
import { deleteSourceType } from './thunk';

const initialState: SourceTypesDeleteState = {
    data: null,
    status: SourceTypesListStatus.IDLE,
    error: null,
};

const sourceTypesDeleteSlice = createSlice({
    name: 'sourceTypesDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSourceType.pending, (state) => {
                state.status = SourceTypesListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteSourceType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteSourceType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default sourceTypesDeleteSlice.reducer;
