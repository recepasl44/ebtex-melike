import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuizStudentsAddState } from '../../../types/quizstudents/add';
import QuizStudentsListStatus from '../../../enums/quizstudents/list';
import { addQuizStudent } from './thunk';

const initialState: QuizStudentsAddState = {
  data: null,
  status: QuizStudentsListStatus.IDLE,
  error: null,
};

const quizStudentsAddSlice = createSlice({
  name: 'quizstudentsAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuizStudent.pending, (state) => {
        state.status = QuizStudentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addQuizStudent.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addQuizStudent.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default quizStudentsAddSlice.reducer;
