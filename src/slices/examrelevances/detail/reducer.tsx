import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchExamRelevance } from './thunk';
import { ExamRelevanceShowState } from '../../../types/examrelevances/detail';
import { ExamRelevanceListStatus } from '../../../enums/examrelevances/list';

const initialState: ExamRelevanceShowState = {
    data: null,
    status: ExamRelevanceListStatus.IDLE,
    error: null,
};

const examRelevanceShowSlice = createSlice({
    name: 'examRelevanceShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamRelevance.pending, (state) => {
                state.status = ExamRelevanceListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchExamRelevance.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = ExamRelevanceListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchExamRelevance.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = ExamRelevanceListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default examRelevanceShowSlice.reducer;
