import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addQuestion } from './thunk';
import { QuestionsAddState } from '../../../types/questions/add';
import { QuestionsListStatus } from '../../../enums/questions/list';

const initialState: QuestionsAddState = {
  data: null,
  status: QuestionsListStatus.IDLE,
  error: null,
};

const questionsAddSlice = createSlice({
  name: 'questionsAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addQuestion.pending, (state) => {
        state.status = QuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addQuestion.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addQuestion.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionsAddSlice.reducer;
