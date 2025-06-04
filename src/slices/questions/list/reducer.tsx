import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchQuestions } from './thunk';
import { ListQuestionsResponse } from '../../../types/questions/list';
import { QuestionsListStatus } from '../../../enums/questions/list';

export interface QuestionsListState {
  data: ListQuestionsResponse['data'] | null;
  links: ListQuestionsResponse['links'] | null;
  meta: ListQuestionsResponse['meta'] | null;
  status: QuestionsListStatus;
  error: string | null;
}

const initialState: QuestionsListState = {
  data: null,
  links: null,
  meta: null,
  status: QuestionsListStatus.IDLE,
  error: null,
};

const questionsListSlice = createSlice({
  name: 'questionsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = QuestionsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<ListQuestionsResponse>) => {
        state.status = QuestionsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchQuestions.rejected, (state, action: PayloadAction<any>) => {
        state.status = QuestionsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default questionsListSlice.reducer;
