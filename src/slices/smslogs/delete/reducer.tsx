import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteSmsLog } from './thunk';
import { DeleteSmsLogState } from '../../../types/smslogs/delete';
import SmsLogsListStatus from '../../../enums/smslogs/list';

const initialState: DeleteSmsLogState = {
  deletedId: null,
  status: SmsLogsListStatus.IDLE,
  error: null,
};

const deleteSmsLogSlice = createSlice({
  name: 'smslogs/delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSmsLog.pending, (state) => {
        state.status = SmsLogsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteSmsLog.fulfilled, (state, action: PayloadAction<{ deletedId: number }>) => {
        state.status = SmsLogsListStatus.SUCCEEDED;
        state.deletedId = action.payload.deletedId;
      })
      .addCase(deleteSmsLog.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsLogsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default deleteSmsLogSlice.reducer;
