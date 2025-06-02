import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteExamRelevance } from './thunk';
import { ExamRelevanceDeleteState } from '../../../types/examrelevances/delete';
import { ExamRelevanceListStatus } from '../../../enums/examrelevances/list';

const initialState: ExamRelevanceDeleteState = {
    data: null,
    status: ExamRelevanceListStatus.IDLE,
    error: null,
};

const examRelevanceDeleteSlice = createSlice({
    name: 'examRelevanceDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteExamRelevance.pending, (state) => {
                state.status = ExamRelevanceListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteExamRelevance.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ExamRelevanceListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteExamRelevance.rejected, (state, action: PayloadAction<any>) => {
                state.status = ExamRelevanceListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default examRelevanceDeleteSlice.reducer;
