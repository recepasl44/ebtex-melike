import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizStudentsDeleteState } from '../../../types/quizstudents/delete';
import QuizStudentsListStatus from '../../../enums/quizstudents/list';
import { deleteQuizStudent } from './thunk';

const initialState: QuizStudentsDeleteState = {
  data: null,
  status: QuizStudentsListStatus.IDLE,
  error: null,
};

const quizStudentsDeleteSlice = createSlice({
  name: 'quizstudentsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuizStudent.pending, (state) => {
        state.status = QuizStudentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteQuizStudent.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteQuizStudent.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizStudentsDeleteSlice.reducer;
