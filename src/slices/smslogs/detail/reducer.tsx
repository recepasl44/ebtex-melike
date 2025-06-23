import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSmsLog } from './thunk';
import SmsLogsListStatus from '../../../enums/smslogs/list';
import { SmsLogDetailState } from '../../../types/smslogs/detail';
import { SmsLog } from '../../../types/smslogs/list';

const initialState: SmsLogDetailState = {
  data: null,
  status: SmsLogsListStatus.IDLE,
  error: null,
};

const smsLogDetailSlice = createSlice({
  name: 'smslogs/detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmsLog.pending, (state) => {
        state.status = SmsLogsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSmsLog.fulfilled, (state, action: PayloadAction<SmsLog>) => {
        state.status = SmsLogsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchSmsLog.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsLogsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default smsLogDetailSlice.reducer;
