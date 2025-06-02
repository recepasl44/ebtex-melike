
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCurriculum } from './thunk';
import { CurriculumDeleteState } from '../../../types/curriculum/delete';
import { CurriculumListStatus } from '../../../enums/curriculum/list';

const initialState: CurriculumDeleteState = {
  data: null,
  status: CurriculumListStatus.IDLE,
  error: null
};

const curriculumDeleteSlice = createSlice({
  name: 'curriculumDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteCurriculum.pending, (state) => {
      state.status = CurriculumListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(deleteCurriculum.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(deleteCurriculum.rejected, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.FAILED;
      state.error = action.payload;
    });
  }
});

export default curriculumDeleteSlice.reducer;
