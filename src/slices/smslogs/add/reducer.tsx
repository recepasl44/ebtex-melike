import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addSmsLog } from './thunk';
import { AddSmsLogState } from '../../../types/smslogs/add';
import SmsLogsListStatus from '../../../enums/smslogs/list';
import { SmsLog } from '../../../types/smslogs/list';

const initialState: AddSmsLogState = {
  data: null,
  status: SmsLogsListStatus.IDLE,
  error: null,
};

const addSmsLogSlice = createSlice({
  name: 'smslogs/add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSmsLog.pending, (state) => {
        state.status = SmsLogsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addSmsLog.fulfilled, (state, action: PayloadAction<SmsLog>) => {
        state.status = SmsLogsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addSmsLog.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsLogsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default addSmsLogSlice.reducer;
