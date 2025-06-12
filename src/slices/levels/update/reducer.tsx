import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateLevel } from './thunk';
import { LevelUpdateState } from '../../../types/levels/update';
import { LevelListStatus } from '../../../enums/levels/list';
const initialState: LevelUpdateState = {
  data: null,
  status: LevelListStatus.IDLE,
  error: null
};
const levelUpdateSlice = createSlice({
  name: 'levels/update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateLevel.pending, (state) => {
      state.status = LevelListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(updateLevel.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(updateLevel.rejected, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.FAILED;
      state.error = action.payload;
    });
  }
});
export default levelUpdateSlice.reducer;
