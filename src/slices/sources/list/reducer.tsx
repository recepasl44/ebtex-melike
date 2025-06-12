import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SourcesListResponse, SourceData } from '../../../types/sources/list';
import SourcesListStatus from '../../../enums/sources/list';
import { fetchSources } from './thunk';

interface SourcesListState {
    data: SourceData[] | null;
    links: SourcesListResponse['links'] | null;
    meta: SourcesListResponse['meta'] | null;
    status: SourcesListStatus;
    error: string | null;
}

const initialState: SourcesListState = {
    data: null,
    links: null,
    meta: null,
    status: SourcesListStatus.IDLE,
    error: null,
};

const sourcesListSlice = createSlice({
    name: 'sources/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSources.pending, (state) => {
                state.status = SourcesListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchSources.fulfilled, (state, action: PayloadAction<SourcesListResponse>) => {
                state.status = SourcesListStatus.SUCCEEDED;
                state.data = action.payload.data;
                state.links = action.payload.links;
                state.meta = action.payload.meta;
            })
            .addCase(fetchSources.rejected, (state, action: PayloadAction<any>) => {
                state.status = SourcesListStatus.FAILED;
                state.error = action.payload || 'Fetch sources failed';
            });
    },
});

export default sourcesListSlice.reducer;
