import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateQuestionCurriculum } from './thunk';
import { QuestionCurriculumsUpdateState } from '../../../types/questioncurriculums/update';
import QuestionCurriculumsListStatus from '../../../enums/questioncurriculums/list';

const initialState: QuestionCurriculumsUpdateState = {
  data: null,
  status: QuestionCurriculumsListStatus.IDLE,
  error: null,
};

const questionCurriculumsUpdateSlice = createSlice({
  name: 'questioncurriculumsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateQuestionCurriculum.pending, (state) => {
        state.status = QuestionCurriculumsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateQuestionCurriculum.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateQuestionCurriculum.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionCurriculumsUpdateSlice.reducer;
