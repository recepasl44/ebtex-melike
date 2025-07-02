import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteQuestionCurriculum } from './thunk';
import { QuestionCurriculumsDeleteState } from '../../../types/questioncurriculums/delete';
import QuestionCurriculumsListStatus from '../../../enums/questioncurriculums/list';

const initialState: QuestionCurriculumsDeleteState = {
  data: null,
  status: QuestionCurriculumsListStatus.IDLE,
  error: null,
};

const questionCurriculumsDeleteSlice = createSlice({
  name: 'questioncurriculumsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuestionCurriculum.pending, (state) => {
        state.status = QuestionCurriculumsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteQuestionCurriculum.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteQuestionCurriculum.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionCurriculumsDeleteSlice.reducer;
