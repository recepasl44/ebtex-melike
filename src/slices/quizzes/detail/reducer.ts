import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import QuizzesListStatus from '../../../enums/quizzes/list';
import { fetchQuiz } from './thunk';
import { QuizzesDetailState } from '../../../types/quizzes/detail';

const initialState: QuizzesDetailState = {
  data: null,
  status: QuizzesListStatus.IDLE,
  error: null,
};

const quizzesDetailSlice = createSlice({
  name: 'quizzesDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.status = QuizzesListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuiz.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizzesDetailSlice.reducer;
