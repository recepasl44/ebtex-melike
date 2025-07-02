import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizStudentsUpdateState } from '../../../types/quizstudents/update';
import QuizStudentsListStatus from '../../../enums/quizstudents/list';
import { updateQuizStudent } from './thunk';

const initialState: QuizStudentsUpdateState = {
  data: null,
  status: QuizStudentsListStatus.IDLE,
  error: null,
};

const quizStudentsUpdateSlice = createSlice({
  name: 'quizstudentsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateQuizStudent.pending, (state) => {
        state.status = QuizStudentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateQuizStudent.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateQuizStudent.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizStudentsUpdateSlice.reducer;
