import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSmsProvider } from './thunk';
import SmsProvidersListStatus from '../../../enums/smsproviders/list';
import { SmsProviderDetailState } from '../../../types/smsproviders/detail';
import { SmsProvider } from '../../../types/smsproviders/list';

const initialState: SmsProviderDetailState = {
  data: null,
  status: SmsProvidersListStatus.IDLE,
  error: null,
};

const smsProviderDetailSlice = createSlice({
  name: 'smsproviders/detail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmsProvider.pending, (state) => {
        state.status = SmsProvidersListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSmsProvider.fulfilled, (state, action: PayloadAction<SmsProvider>) => {
        state.status = SmsProvidersListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchSmsProvider.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsProvidersListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default smsProviderDetailSlice.reducer;
