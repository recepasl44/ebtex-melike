import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteBulletin } from './thunk';
import { BulletinsDeleteState } from '../../../types/bulletins/delete';
import { BulletinsListStatus } from '../../../enums/bulletins/list';

const initialState: BulletinsDeleteState = {
  data: null,
  status: BulletinsListStatus.IDLE,
  error: null,
};

const bulletinsDeleteSlice = createSlice({
  name: 'bulletinsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteBulletin.pending, (state) => {
        state.status = BulletinsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteBulletin.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteBulletin.rejected, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default bulletinsDeleteSlice.reducer;
