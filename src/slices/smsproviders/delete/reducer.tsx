import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteSmsProvider } from './thunk';
import { DeleteSmsProviderState } from '../../../types/smsproviders/delete';
import SmsProvidersListStatus from '../../../enums/smsproviders/list';

const initialState: DeleteSmsProviderState = {
  deletedId: null,
  status: SmsProvidersListStatus.IDLE,
  error: null,
};

const deleteSmsProviderSlice = createSlice({
  name: 'smsproviders/delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSmsProvider.pending, (state) => {
        state.status = SmsProvidersListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteSmsProvider.fulfilled, (state, action: PayloadAction<{ deletedId: number }>) => {
        state.status = SmsProvidersListStatus.SUCCEEDED;
        state.deletedId = action.payload.deletedId;
      })
      .addCase(deleteSmsProvider.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsProvidersListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default deleteSmsProviderSlice.reducer;
