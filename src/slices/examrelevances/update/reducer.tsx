import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateExamRelevance } from './thunk';
import { ExamRelevanceUpdateState } from '../../../types/examrelevances/update';
import { ExamRelevanceListStatus } from '../../../enums/examrelevances/list';

const initialState: ExamRelevanceUpdateState = {
    data: null,
    status: ExamRelevanceListStatus.IDLE,
    error: null,
};

const examRelevanceUpdateSlice = createSlice({
    name: 'examRelevanceUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateExamRelevance.pending, (state) => {
                state.status = ExamRelevanceListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateExamRelevance.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ExamRelevanceListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateExamRelevance.rejected, (state, action: PayloadAction<any>) => {
                state.status = ExamRelevanceListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default examRelevanceUpdateSlice.reducer;
