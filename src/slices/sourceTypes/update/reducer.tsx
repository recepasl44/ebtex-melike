import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourceTypesUpdateState } from '../../../types/sourceTypes/update';
import SourceTypesListStatus from '../../../enums/sourceTypes/list';
import { updateSourceType } from './thunk';

const initialState: SourceTypesUpdateState = {
    data: null,
    status: SourceTypesListStatus.IDLE,
    error: null,
};

const sourceTypesUpdateSlice = createSlice({
    name: 'sourceTypesUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateSourceType.pending, (state) => {
                state.status = SourceTypesListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateSourceType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateSourceType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default sourceTypesUpdateSlice.reducer;
