import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateBulletin } from './thunk';
import { BulletinsUpdateState } from '../../../types/bulletins/update';
import { BulletinsListStatus } from '../../../enums/bulletins/list';

const initialState: BulletinsUpdateState = {
  data: null,
  status: BulletinsListStatus.IDLE,
  error: null,
};

const bulletinsUpdateSlice = createSlice({
  name: 'bulletinsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateBulletin.pending, (state) => {
        state.status = BulletinsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateBulletin.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateBulletin.rejected, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default bulletinsUpdateSlice.reducer;
