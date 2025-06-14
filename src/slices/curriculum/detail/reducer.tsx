
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCurriculumDetail } from './thunk';
import { CurriculumDetailState } from '../../../types/curriculum/detail';
import { CurriculumListStatus } from '../../../enums/curriculum/list';

const initialState: CurriculumDetailState = {
  data: null,
  status: CurriculumListStatus.IDLE,
  error: null
};

const curriculumDetailSlice = createSlice({
  name: 'curriculumDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurriculumDetail.pending, (state) => {
      state.status = CurriculumListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchCurriculumDetail.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchCurriculumDetail.rejected, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.FAILED;
      state.error = action.payload;
    });
  }
});

export default curriculumDetailSlice.reducer;
