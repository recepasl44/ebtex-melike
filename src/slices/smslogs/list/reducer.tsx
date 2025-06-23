import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSmsLogs } from './thunk';
import SmsLogsListStatus from '../../../enums/smslogs/list';
import { SmsLogsListState, SmsLogsListResponse } from '../../../types/smslogs/list';

const initialState: SmsLogsListState = {
  data: null,
  links: null,
  meta: null,
  status: SmsLogsListStatus.IDLE,
  error: null,
};

const smsLogsListSlice = createSlice({
  name: 'smslogs/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmsLogs.pending, (state) => {
        state.status = SmsLogsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSmsLogs.fulfilled, (state, action: PayloadAction<SmsLogsListResponse>) => {
        state.status = SmsLogsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchSmsLogs.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsLogsListStatus.FAILED;
        state.error = action.payload || 'Fetch sms logs failed';
      });
  },
});

export default smsLogsListSlice.reducer;
