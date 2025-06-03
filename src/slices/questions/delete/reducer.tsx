import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteQuestion } from './thunk';
import { QuestionsDeleteState } from '../../../types/questions/delete';
import { QuestionsListStatus } from '../../../enums/questions/list';

const initialState: QuestionsDeleteState = {
  data: null,
  status: QuestionsListStatus.IDLE,
  error: null,
};

const questionsDeleteSlice = createSlice({
  name: 'questionsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteQuestion.pending, (state) => {
        state.status = QuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionsDeleteSlice.reducer;
