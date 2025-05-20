import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SourceTypesListStatus from '../../../enums/sourceTypes/list';
import { SourceTypesDetailState } from '../../../types/sourceTypes/detail';
import { fetchSourceType } from './thunk';

const initialState: SourceTypesDetailState = {
    data: null,
    status: SourceTypesListStatus.IDLE,
    error: null,
};

const sourceTypesDetailSlice = createSlice({
    name: 'sourceTypesDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSourceType.pending, (state) => {
                state.status = SourceTypesListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchSourceType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchSourceType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default sourceTypesDetailSlice.reducer;
