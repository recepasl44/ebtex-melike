import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizzesUpdateState } from '../../../types/quizzes/update';
import QuizzesListStatus from '../../../enums/quizzes/list';
import { updateQuiz } from './thunk';

const initialState: QuizzesUpdateState = {
  data: null,
  status: QuizzesListStatus.IDLE,
  error: null,
};

const quizzesUpdateSlice = createSlice({
  name: 'quizzesUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateQuiz.pending, (state) => {
        state.status = QuizzesListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateQuiz.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateQuiz.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizzesUpdateSlice.reducer;
