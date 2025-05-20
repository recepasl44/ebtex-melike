
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchPlatform } from './thunk';
import {
  IPlatform,
  PlatformListState,
  PlatformListStatus
} from '../../../types/platform/list';

const initialState: PlatformListState = {
  data: [],
  status: PlatformListStatus.IDLE,
  error: null,
};

const platformListSlice = createSlice({
  name: 'finalRegister/fetchPlatform',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlatform.pending, (state) => {
      state.status = PlatformListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchPlatform.fulfilled, (state, action: PayloadAction<IPlatform[]>) => {
      state.status = PlatformListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchPlatform.rejected, (state, action: PayloadAction<any>) => {
      state.status = PlatformListStatus.FAILED;
      state.error = action.payload || 'Fetch platform failed';
    });
  },
});

export default platformListSlice.reducer;
