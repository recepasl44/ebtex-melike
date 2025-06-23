import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateSmsLog } from './thunk';
import { UpdateSmsLogState } from '../../../types/smslogs/update';
import SmsLogsListStatus from '../../../enums/smslogs/list';
import { SmsLog } from '../../../types/smslogs/list';

const initialState: UpdateSmsLogState = {
  data: null,
  status: SmsLogsListStatus.IDLE,
  error: null,
};

const updateSmsLogSlice = createSlice({
  name: 'smslogs/update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSmsLog.pending, (state) => {
        state.status = SmsLogsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateSmsLog.fulfilled, (state, action: PayloadAction<SmsLog>) => {
        state.status = SmsLogsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateSmsLog.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsLogsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default updateSmsLogSlice.reducer;
