import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addLevel } from './thunk';
import { LevelAddState } from '../../../types/levels/add';
import { LevelListStatus } from '../../../enums/levels/list';
const initialState: LevelAddState = {
  data: null,
  status: LevelListStatus.IDLE,
  error: null
};
const levelAddSlice = createSlice({
  name: 'levels/add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addLevel.pending, (state) => {
      state.status = LevelListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(addLevel.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(addLevel.rejected, (state, action: PayloadAction<any>) => {
      state.status = LevelListStatus.FAILED;
      state.error = action.payload;
    });
  }
});
export default levelAddSlice.reducer;
