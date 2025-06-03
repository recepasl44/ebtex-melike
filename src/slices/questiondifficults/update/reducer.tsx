import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateQuestionDifficult } from './thunk';
import { QuestionDifficultUpdateState } from '../../../types/questiondifficults/update';
import { QuestionDifficultListStatus } from '../../../enums/questiondifficults/list';

const initialState: QuestionDifficultUpdateState = {
    data: null,
    status: QuestionDifficultListStatus.IDLE,
    error: null,
};

const questionDifficultUpdateSlice = createSlice({
    name: 'questionDifficultUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateQuestionDifficult.pending, (state) => {
                state.status = QuestionDifficultListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateQuestionDifficult.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuestionDifficultListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateQuestionDifficult.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuestionDifficultListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default questionDifficultUpdateSlice.reducer;
