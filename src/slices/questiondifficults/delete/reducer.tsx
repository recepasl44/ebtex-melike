import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteQuestionDifficult } from './thunk';
import { QuestionDifficultDeleteState } from '../../../types/questiondifficults/delete';
import { QuestionDifficultListStatus } from '../../../enums/questiondifficults/list';

const initialState: QuestionDifficultDeleteState = {
    data: null,
    status: QuestionDifficultListStatus.IDLE,
    error: null,
};

const questionDifficultDeleteSlice = createSlice({
    name: 'questionDifficultDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteQuestionDifficult.pending, (state) => {
                state.status = QuestionDifficultListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteQuestionDifficult.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuestionDifficultListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteQuestionDifficult.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuestionDifficultListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default questionDifficultDeleteSlice.reducer;
