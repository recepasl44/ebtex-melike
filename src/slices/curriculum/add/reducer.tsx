
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCurriculum } from './thunk';
import { CurriculumAddState } from '../../../types/curriculum/add';
import { CurriculumListStatus } from '../../../enums/curriculum/list';

const initialState: CurriculumAddState = {
  data: null,
  status: CurriculumListStatus.IDLE,
  error: null
};

const curriculumAddSlice = createSlice({
  name: 'curriculumAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCurriculum.pending, (state) => {
      state.status = CurriculumListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(addCurriculum.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(addCurriculum.rejected, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.FAILED;
      state.error = action.payload;
    });
  }
});

export default curriculumAddSlice.reducer;
