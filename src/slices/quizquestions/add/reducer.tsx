import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addQuizQuestion } from './thunk';
import { QuizQuestionsAddState } from '../../../types/quizquestions/add';
import { QuizQuestionsListStatus } from '../../../enums/quizquestions/list';

const initialState: QuizQuestionsAddState = {
  data: null,
  status: QuizQuestionsListStatus.IDLE,
  error: null,
};

const quizQuestionAddSlice = createSlice({
  name: 'quizQuestionAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuizQuestion.pending, (state) => {
        state.status = QuizQuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addQuizQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addQuizQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizQuestionAddSlice.reducer;
