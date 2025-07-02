import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizQuestionsUpdateState } from '../../../types/quizquestions/update';
import { QuizQuestionsListStatus } from '../../../enums/quizquestions/list';
import { updateQuizQuestion } from './thunk';

const initialState: QuizQuestionsUpdateState = {
  data: null,
  status: QuizQuestionsListStatus.IDLE,
  error: null,
};

const quizQuestionUpdateSlice = createSlice({
  name: 'quizQuestionUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateQuizQuestion.pending, (state) => {
        state.status = QuizQuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateQuizQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateQuizQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizQuestionUpdateSlice.reducer;
