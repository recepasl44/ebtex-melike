import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addBulletin } from './thunk';
import { BulletinsAddState } from '../../../types/bulletins/add';
import { BulletinsListStatus } from '../../../enums/bulletins/list';

const initialState: BulletinsAddState = {
  data: null,
  status: BulletinsListStatus.IDLE,
  error: null,
};

const bulletinAddSlice = createSlice({
  name: 'bulletinAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addBulletin.pending, (state) => {
        state.status = BulletinsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addBulletin.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addBulletin.rejected, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default bulletinAddSlice.reducer;
