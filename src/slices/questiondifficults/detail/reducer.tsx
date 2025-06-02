import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestionDifficult } from './thunk';
import { QuestionDifficultShowState } from '../../../types/questiondifficults/detail';
import { QuestionDifficultListStatus } from '../../../enums/questiondifficults/list';

const initialState: QuestionDifficultShowState = {
    data: null,
    status: QuestionDifficultListStatus.IDLE,
    error: null,
};

const questionDifficultShowSlice = createSlice({
    name: 'questionDifficultShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionDifficult.pending, (state) => {
                state.status = QuestionDifficultListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchQuestionDifficult.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = QuestionDifficultListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchQuestionDifficult.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = QuestionDifficultListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default questionDifficultShowSlice.reducer;
