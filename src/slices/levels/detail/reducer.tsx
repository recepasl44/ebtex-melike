import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchLevelDetail } from './thunk';
import { LevelDetailState } from '../../../types/levels/detail';
import { LevelListStatus } from '../../../enums/levels/list';
const initialState: LevelDetailState = {
  data: null,
  status: LevelListStatus.IDLE,
  error: null
};
const levelDetailSlice = createSlice({
  name: 'levels/detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLevelDetail.pending, (state) => {
      state.status = LevelListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchLevelDetail.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchLevelDetail.rejected, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.FAILED;
      state.error = action.payload;
    });
  }
});
export default levelDetailSlice.reducer;
