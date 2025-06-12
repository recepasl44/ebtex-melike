import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addQuestionType } from './thunk';
import { QuestionTypeAddState } from '../../../types/questiontypes/add';
import { QuestionTypeListStatus } from '../../../enums/questiontypes/list';

const initialState: QuestionTypeAddState = {
    data: null,
    status: QuestionTypeListStatus.IDLE,
    error: null,
};

const questionTypeAddSlice = createSlice({
    name: 'questionTypeAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addQuestionType.pending, (state) => {
                state.status = QuestionTypeListStatus.LOADING;
                state.error = null;
            })
            .addCase(addQuestionType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = QuestionTypeListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(addQuestionType.rejected, (state, action: PayloadAction<any>) => {
                state.status = QuestionTypeListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default questionTypeAddSlice.reducer;
