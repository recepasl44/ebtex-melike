import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestion } from './thunk';
import { QuestionShowState } from '../../../types/questions/detail';
import { QuestionsListStatus } from '../../../enums/questions/list';

const initialState: QuestionShowState = {
  data: null,
  status: QuestionsListStatus.IDLE,
  error: null,
};

const questionShowSlice = createSlice({
  name: 'questionShow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestion.pending, (state) => {
        state.status = QuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionShowSlice.reducer;
