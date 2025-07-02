import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizStudentsDetailState } from '../../../types/quizstudents/detail';
import QuizStudentsListStatus from '../../../enums/quizstudents/list';
import { fetchQuizStudent } from './thunk';

const initialState: QuizStudentsDetailState = {
  data: null,
  status: QuizStudentsListStatus.IDLE,
  error: null,
};

const quizStudentsDetailSlice = createSlice({
  name: 'quizstudentsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizStudent.pending, (state) => {
        state.status = QuizStudentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuizStudent.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchQuizStudent.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizStudentsDetailSlice.reducer;
