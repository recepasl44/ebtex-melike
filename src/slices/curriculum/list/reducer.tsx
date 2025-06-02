
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLevels } from './thunk';
import { CurriculumListResponse } from '../../../types/curriculum/list';
import { CurriculumListStatus } from '../../../enums/curriculum/list';

const initialState: {
  data: CurriculumListResponse['data'] | null;
  links: CurriculumListResponse['links'] | null;
  meta: CurriculumListResponse['meta'] | null;
  status: CurriculumListStatus;
  error: string | null;
} = {
  data: null,
  links: null,
  meta: null,
  status: CurriculumListStatus.IDLE,
  error: null
};

const curriculumListSlice = createSlice({
  name: 'curriculumList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLevels.pending, (state) => {
      state.status = CurriculumListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchLevels.fulfilled, (state, action: PayloadAction<CurriculumListResponse>) => {
      state.status = CurriculumListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchLevels.rejected, (state, action: PayloadAction<any>) => {
      state.status = CurriculumListStatus.FAILED;
      state.error = action.payload;
    });
  }
});

export default curriculumListSlice.reducer;
