import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateQuestion } from './thunk';
import { QuestionsUpdateState } from '../../../types/questions/update';
import { QuestionsListStatus } from '../../../enums/questions/list';

const initialState: QuestionsUpdateState = {
  data: null,
  status: QuestionsListStatus.IDLE,
  error: null,
};

const questionsUpdateSlice = createSlice({
  name: 'questionsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateQuestion.pending, (state) => {
        state.status = QuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionsUpdateSlice.reducer;
