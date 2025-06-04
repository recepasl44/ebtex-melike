import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteQuestionType } from './thunk';
import { QuestionTypeDeleteState } from '../../../types/questiontypes/delete';
import { QuestionTypeListStatus } from '../../../enums/questiontypes/list';

const initialState: QuestionTypeDeleteState = {
    data: null,
    status: QuestionTypeListStatus.IDLE,
    error: null,
};

const questionTypeDeleteSlice = createSlice({
    name: 'questionTypeDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteQuestionType.pending, (state) => {
                state.status = QuestionTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteQuestionType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuestionTypeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteQuestionType.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuestionTypeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default questionTypeDeleteSlice.reducer;
