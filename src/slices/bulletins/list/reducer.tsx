import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBulletins } from './thunk';
import { ListBulletinResponse } from '../../../types/bulletins/list';
import { BulletinsListStatus } from '../../../enums/bulletins/list';

export interface BulletinsListState {
  data: ListBulletinResponse['data'] | null;
  links: ListBulletinResponse['links'] | null;
  meta: ListBulletinResponse['meta'] | null;
  status: BulletinsListStatus;
  error: string | null;
}

const initialState: BulletinsListState = {
  data: null,
  links: null,
  meta: null,
  status: BulletinsListStatus.IDLE,
  error: null,
};

const bulletinsListSlice = createSlice({
  name: 'bulletins/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBulletins.pending, (state) => {
        state.status = BulletinsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchBulletins.fulfilled, (state, action: PayloadAction<ListBulletinResponse>) => {
        state.status = BulletinsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchBulletins.rejected, (state, action: PayloadAction<any>) => {
        state.status = BulletinsListStatus.FAILED;
        state.error = action.payload || 'Fetch bulletins failed';
      });
  },
});

export default bulletinsListSlice.reducer;
