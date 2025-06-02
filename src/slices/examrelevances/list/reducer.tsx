import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchExamRelevances } from './thunk';
import { ListExamRelevanceResponse } from '../../../types/examrelevances/list';
import { ExamRelevanceListStatus } from '../../../enums/examrelevances/list';

export interface ExamRelevanceListState {
    data: ListExamRelevanceResponse['data'] | null;
    links: ListExamRelevanceResponse['links'] | null;
    meta: ListExamRelevanceResponse['meta'] | null;
    status: ExamRelevanceListStatus;
    error: string | null;
}

const initialState: ExamRelevanceListState = {
    data: null,
    links: null,
    meta: null,
    status: ExamRelevanceListStatus.IDLE,
    error: null,
};

const examRelevanceListSlice = createSlice({
    name: 'examRelevances/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchExamRelevances.pending, (state) => {
            state.status = ExamRelevanceListStatus.LOADING;
            state.error = null;
        });
        builder.addCase(fetchExamRelevances.fulfilled, (state, action: PayloadAction<ListExamRelevanceResponse>) => {
            state.status = ExamRelevanceListStatus.SUCCEEDED;
            state.data = action.payload.data;
            state.links = action.payload.links;
            state.meta = action.payload.meta;
        });
        builder.addCase(fetchExamRelevances.rejected, (state, action: PayloadAction<any>) => {
            state.status = ExamRelevanceListStatus.FAILED;
            state.error = action.payload || 'Fetch exam relevances failed';
        });
    },
});

export default examRelevanceListSlice.reducer;
