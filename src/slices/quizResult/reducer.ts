import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {fetchQuizResults} from "./thunk";
import {QuizResultsListResponse, QuizResultsListState} from "../../types/quizResult/list";
import QuizResultsListStatus from "../../enums/quizResult/list";

const initialState: QuizResultsListState = {
  data: null,
  links: null,
  meta: null,
  status: QuizResultsListStatus.IDLE,
  error: null,
};

const quizResultsListSlice = createSlice({
  name: 'quizresultsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizResults.pending, (state) => {
        state.status = QuizResultsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuizResults.fulfilled, (state, action: PayloadAction<QuizResultsListResponse>) => {
        state.status = QuizResultsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchQuizResults.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizResultsListStatus.FAILED;
        state.error = action.payload || 'Fetch quiz results failed';
      });
  },
});

export default quizResultsListSlice.reducer;
