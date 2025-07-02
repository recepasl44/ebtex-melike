import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuizQuestion } from './thunk';
import { QuizQuestionsDetailState } from '../../../types/quizquestions/detail';
import { QuizQuestionsListStatus } from '../../../enums/quizquestions/list';

const initialState: QuizQuestionsDetailState = {
  data: null,
  status: QuizQuestionsListStatus.IDLE,
  error: null,
};

const quizQuestionDetailSlice = createSlice({
  name: 'quizQuestionDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestion.pending, (state) => {
        state.status = QuizQuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuizQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchQuizQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizQuestionDetailSlice.reducer;
