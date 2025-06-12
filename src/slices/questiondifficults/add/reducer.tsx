import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addQuestionDifficult } from './thunk';
import { QuestionDifficultAddState } from '../../../types/questiondifficults/add';
import { QuestionDifficultListStatus } from '../../../enums/questiondifficults/list';

const initialState: QuestionDifficultAddState = {
    data: null,
    status: QuestionDifficultListStatus.IDLE,
    error: null,
};

const questionDifficultAddSlice = createSlice({
    name: 'questionDifficultAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuestionDifficult.pending, (state) => {
                state.status = QuestionDifficultListStatus.LOADING;
                state.error = null;
            })
            .addCase(addQuestionDifficult.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuestionDifficultListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addQuestionDifficult.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuestionDifficultListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default questionDifficultAddSlice.reducer;
