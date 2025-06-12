import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCurriculum } from './thunk';
import { CurriculumUpdateState } from '../../../types/curriculum/update';
import { CurriculumListStatus } from '../../../enums/curriculum/list';

const initialState: CurriculumUpdateState = {
  data: null,
  status: CurriculumListStatus.IDLE,
  error: null
};

const curriculumUpdateSlice = createSlice({
  name: 'curriculumUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCurriculum.pending, (state) => {
      state.status = CurriculumListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(updateCurriculum.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(updateCurriculum.rejected, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.FAILED;
      state.error = action.payload;
    });
  }
});

export default curriculumUpdateSlice.reducer;
