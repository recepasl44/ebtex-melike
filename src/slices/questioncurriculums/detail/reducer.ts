import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestionCurriculumsDetail } from './thunk';
import { QuestionCurriculumsDetailState } from '../../../types/questioncurriculums/detail';
import QuestionCurriculumsListStatus from '../../../enums/questioncurriculums/list';

const initialState: QuestionCurriculumsDetailState = {
  data: null,
  status: QuestionCurriculumsListStatus.IDLE,
  error: null,
};

const questionCurriculumsDetailSlice = createSlice({
  name: 'questioncurriculumsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionCurriculumsDetail.pending, (state) => {
        state.status = QuestionCurriculumsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuestionCurriculumsDetail.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchQuestionCurriculumsDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionCurriculumsDetailSlice.reducer;
