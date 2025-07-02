import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizzesDeleteState } from '../../../types/quizzes/delete';
import QuizzesListStatus from '../../../enums/quizzes/list';
import { deleteQuiz } from './thunk';

const initialState: QuizzesDeleteState = {
  data: null,
  status: QuizzesListStatus.IDLE,
  error: null,
};

const quizzesDeleteSlice = createSlice({
  name: 'quizzesDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuiz.pending, (state) => {
        state.status = QuizzesListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteQuiz.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizzesDeleteSlice.reducer;
