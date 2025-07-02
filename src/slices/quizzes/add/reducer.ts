import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizzesAddState } from '../../../types/quizzes/add';
import QuizzesListStatus from '../../../enums/quizzes/list';
import { addQuiz } from './thunk';

const initialState: QuizzesAddState = {
  data: null,
  status: QuizzesListStatus.IDLE,
  error: null,
};

const quizzesAddSlice = createSlice({
  name: 'quizzesAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuiz.pending, (state) => {
        state.status = QuizzesListStatus.LOADING;
        state.error = null;
      })
      .addCase(addQuiz.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addQuiz.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizzesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizzesAddSlice.reducer;
