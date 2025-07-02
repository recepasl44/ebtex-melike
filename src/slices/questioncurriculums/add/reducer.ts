import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addQuestionCurriculum } from './thunk';
import { QuestionCurriculumsAddState } from '../../../types/questioncurriculums/add';
import QuestionCurriculumsListStatus from '../../../enums/questioncurriculums/list';

const initialState: QuestionCurriculumsAddState = {
  data: null,
  status: QuestionCurriculumsListStatus.IDLE,
  error: null,
};

const questionCurriculumsAddSlice = createSlice({
  name: 'questioncurriculumsAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuestionCurriculum.pending, (state) => {
        state.status = QuestionCurriculumsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addQuestionCurriculum.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addQuestionCurriculum.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionCurriculumsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionCurriculumsAddSlice.reducer;
