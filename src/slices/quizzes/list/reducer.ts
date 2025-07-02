import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizzesListResponse, QuizzesListState } from '../../../types/quizzes/list';
import QuizzesListStatus from '../../../enums/quizzes/list';
import { fetchQuizzes } from './thunk';

const initialState: QuizzesListState = {
  data: null,
  links: null,
  meta: null,
  status: QuizzesListStatus.IDLE,
  error: null,
};

const quizzesListSlice = createSlice({
  name: 'quizzesList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = QuizzesListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action: PayloadAction<QuizzesListResponse>) => {
        state.status = QuizzesListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchQuizzes.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.FAILED;
        state.error = action.payload || 'Fetch quizzes failed';
      });
  },
});

export default quizzesListSlice.reducer;
