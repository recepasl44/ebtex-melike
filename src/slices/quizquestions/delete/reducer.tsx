import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteQuizQuestion } from './thunk';
import { QuizQuestionsDeleteState } from '../../../types/quizquestions/delete';
import { QuizQuestionsListStatus } from '../../../enums/quizquestions/list';

const initialState: QuizQuestionsDeleteState = {
  data: null,
  status: QuizQuestionsListStatus.IDLE,
  error: null,
};

const quizQuestionDeleteSlice = createSlice({
  name: 'quizQuestionDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuizQuestion.pending, (state) => {
        state.status = QuizQuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteQuizQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteQuizQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizQuestionDeleteSlice.reducer;
