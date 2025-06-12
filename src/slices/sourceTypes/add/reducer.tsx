import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourceTypesAddState } from '../../../types/sourceTypes/add';
import SourceTypesListStatus from '../../../enums/sourceTypes/list';
import { addSourceType } from './thunk';

const initialState: SourceTypesAddState = {
    data: null,
    status: SourceTypesListStatus.IDLE,
    error: null,
};

const sourceTypesAddSlice = createSlice({
    name: 'sourceTypesAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addSourceType.pending, (state) => {
                state.status = SourceTypesListStatus.LOADING;
                state.error = null;
            })
            .addCase(addSourceType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addSourceType.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default sourceTypesAddSlice.reducer;
