import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuestionCurriculumsListResponse } from '../../../types/questioncurriculums/list';
import QuestionCurriculumsListStatus from '../../../enums/questioncurriculums/list';
import { fetchQuestionCurriculums } from './thunk';
export interface QuestionCurriculumsListState {
  data: QuestionCurriculumsListResponse['data'] | null;
  links: QuestionCurriculumsListResponse['links'] | null;
  meta: QuestionCurriculumsListResponse['meta'] | null;
  status: QuestionCurriculumsListStatus;
  error: string | null;
}

const initialState: QuestionCurriculumsListState = {
  data: null,
  links: null,
  meta: null,
  status: QuestionCurriculumsListStatus.IDLE,
  error: null,
};

const questionCurriculumsListSlice = createSlice({
  name: 'questioncurriculumsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQuestionCurriculums.pending, (state) => {
      state.status = QuestionCurriculumsListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchQuestionCurriculums.fulfilled, (state, action: PayloadAction<QuestionCurriculumsListResponse>) => {
      state.status = QuestionCurriculumsListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchQuestionCurriculums.rejected, (state, action: PayloadAction<any>) => {
      state.status = QuestionCurriculumsListStatus.FAILED;
      state.error = action.payload || 'Fetch questionCurriculums failed';
    });
  },
});

export default questionCurriculumsListSlice.reducer;
