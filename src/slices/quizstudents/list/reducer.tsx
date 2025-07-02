import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListQuizStudentsResponse } from '../../../types/quizstudents/list';
import QuizStudentsListStatus from '../../../enums/quizstudents/list';
import { fetchQuizStudents } from './thunk';

export interface QuizStudentsListState {
  data: ListQuizStudentsResponse['data'] | null;
  links: ListQuizStudentsResponse['links'] | null;
  meta: ListQuizStudentsResponse['meta'] | null;
  status: QuizStudentsListStatus;
  error: string | null;
}

const initialState: QuizStudentsListState = {
  data: null,
  links: null,
  meta: null,
  status: QuizStudentsListStatus.IDLE,
  error: null,
};

const quizStudentsListSlice = createSlice({
  name: 'quizstudents/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizStudents.pending, (state) => {
        state.status = QuizStudentsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuizStudents.fulfilled, (state, action: PayloadAction<ListQuizStudentsResponse>) => {
        state.status = QuizStudentsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchQuizStudents.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuizStudentsListStatus.FAILED;
        state.error = action.payload || 'Fetch quiz students failed';
      });
  },
});

export default quizStudentsListSlice.reducer;
