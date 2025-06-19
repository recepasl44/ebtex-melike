import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateQuestionType } from './thunk';
import { QuestionTypeUpdateState } from '../../../types/questiontypes/update';
import { QuestionTypeListStatus } from '../../../enums/questiontypes/list';

const initialState: QuestionTypeUpdateState = {
    data: null,
    status: QuestionTypeListStatus.IDLE,
    error: null,
};

const questionTypeUpdateSlice = createSlice({
    name: 'questionTypeUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateQuestionType.pending, (state) => {
                state.status = QuestionTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(updateQuestionType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuestionTypeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(updateQuestionType.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuestionTypeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default questionTypeUpdateSlice.reducer;
