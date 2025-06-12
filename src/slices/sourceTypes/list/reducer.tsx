import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourceTypesListResponse, SourceTypeData } from '../../../types/sourceTypes/list';
import SourceTypesListStatus from '../../../enums/sourceTypes/list';
import { fetchSourceTypes } from './thunk';

interface SourceTypesListState {
    data: SourceTypeData[] | null;
    links: SourceTypesListResponse['links'] | null;
    meta: SourceTypesListResponse['meta'] | null;
    status: SourceTypesListStatus;
    error: string | null;
}

const initialState: SourceTypesListState = {
    data: null,
    links: null,
    meta: null,
    status: SourceTypesListStatus.IDLE,
    error: null,
};

const sourceTypesListSlice = createSlice({
    name: 'sourceTypes/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSourceTypes.pending, (state) => {
                state.status = SourceTypesListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchSourceTypes.fulfilled, (state, action: PayloadAction<SourceTypesListResponse>) => {
                state.status = SourceTypesListStatus.SUCCEEDED;
                state.data = action.payload.data;
                state.links = action.payload.links;
                state.meta = action.payload.meta;
            })
            .addCase(fetchSourceTypes.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourceTypesListStatus.FAILED;
                state.error = action.payload || 'Fetch sourceTypes failed';
            });
    },
});

export default sourceTypesListSlice.reducer;
