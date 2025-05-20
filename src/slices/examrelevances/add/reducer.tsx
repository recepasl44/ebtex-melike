import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addExamRelevance } from './thunk';
import { ExamRelevanceAddState } from '../../../types/examrelevances/add';
import { ExamRelevanceListStatus } from '../../../enums/examrelevances/list';

const initialState: ExamRelevanceAddState = {
    data: null,
    status: ExamRelevanceListStatus.IDLE,
    error: null,
};

const examRelevanceAddSlice = createSlice({
    name: 'examRelevanceAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addExamRelevance.pending, (state) => {
                state.status = ExamRelevanceListStatus.LOADING;
                state.error = null;
            })
            .addCase(addExamRelevance.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = ExamRelevanceListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addExamRelevance.rejected, (state, action: PayloadAction<any>) => {
                state.status = ExamRelevanceListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default examRelevanceAddSlice.reducer;
