import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteLevel } from './thunk';
import { LevelDeleteState } from '../../../types/levels/delete';
import { LevelListStatus } from '../../../enums/levels/list';
const initialState: LevelDeleteState = {
  data: null,
  status: LevelListStatus.IDLE,
  error: null
};
const levelDeleteSlice = createSlice({
  name: 'levels/delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteLevel.pending, (state) => {
      state.status = LevelListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(deleteLevel.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(deleteLevel.rejected, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.FAILED;
      state.error = action.payload;
    });
  }
});
export default levelDeleteSlice.reducer;
