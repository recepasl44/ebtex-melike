import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBulletin } from './thunk';
import { BulletinShowState } from '../../../types/bulletins/detail';
import { BulletinsListStatus } from '../../../enums/bulletins/list';

const initialState: BulletinShowState = {
  data: null,
  status: BulletinsListStatus.IDLE,
  error: null,
};

const bulletinShowSlice = createSlice({
  name: 'bulletinShow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBulletin.pending, (state) => {
        state.status = BulletinsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchBulletin.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchBulletin.rejected, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default bulletinShowSlice.reducer;
