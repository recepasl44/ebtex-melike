import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateSmsProvider } from './thunk';
import { UpdateSmsProviderState } from '../../../types/smsproviders/update';
import SmsProvidersListStatus from '../../../enums/smsproviders/list';
import { SmsProvider } from '../../../types/smsproviders/list';

const initialState: UpdateSmsProviderState = {
  data: null,
  status: SmsProvidersListStatus.IDLE,
  error: null,
};

const updateSmsProviderSlice = createSlice({
  name: 'smsproviders/update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateSmsProvider.pending, (state) => {
        state.status = SmsProvidersListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateSmsProvider.fulfilled, (state, action: PayloadAction<SmsProvider>) => {
        state.status = SmsProvidersListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateSmsProvider.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsProvidersListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default updateSmsProviderSlice.reducer;
