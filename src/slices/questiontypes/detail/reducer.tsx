import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestionType } from './thunk';
import { QuestionTypeShowState } from '../../../types/questiontypes/detail';
import { QuestionTypeListStatus } from '../../../enums/questiontypes/list';

const initialState: QuestionTypeShowState = {
    data: null,
    status: QuestionTypeListStatus.IDLE,
    error: null,
};

const questionTypeShowSlice = createSlice({
    name: 'questionTypeShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionType.pending, (state) => {
                state.status = QuestionTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(
                fetchQuestionType.fulfilled,
                (state, action: PayloadAction<any>) => {
                    state.status = QuestionTypeListStatus.SUCCEEDED;
                    state.data = action.payload;
                }
            )
            .addCase(
                fetchQuestionType.rejected,
                (state, action: PayloadAction<any>) => {
                    state.status = QuestionTypeListStatus.FAILED;
                    state.error = action.payload;
                }
            );
    },
});

export default questionTypeShowSlice.reducer;
