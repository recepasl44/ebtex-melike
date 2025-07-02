import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizQuestionsResponse } from '../../../types/quizquestions/list';
import { QuizQuestionsListStatus } from '../../../enums/quizquestions/list';
import { fetchQuizQuestions } from './thunk';

export interface QuizQuestionsListState {
  data: QuizQuestionsResponse['data'] | null;
  links: QuizQuestionsResponse['links'] | null;
  meta: QuizQuestionsResponse['meta'] | null;
  status: QuizQuestionsListStatus;
  error: string | null;
}

const initialState: QuizQuestionsListState = {
  data: null,
  links: null,
  meta: null,
  status: QuizQuestionsListStatus.IDLE,
  error: null,
};

const quizQuestionsListSlice = createSlice({
  name: 'quizQuestionsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.status = QuizQuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action: PayloadAction<QuizQuestionsResponse>) => {
        state.status = QuizQuestionsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizQuestionsListStatus.FAILED;
        state.error = action.payload || 'Fetch quiz questions failed';
      });
  },
});

export default quizQuestionsListSlice.reducer;
