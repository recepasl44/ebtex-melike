import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSmsProviders } from './thunk';
import SmsProvidersListStatus from '../../../enums/smsproviders/list';
import { SmsProvidersListState, SmsProvidersListResponse } from '../../../types/smsproviders/list';

const initialState: SmsProvidersListState = {
  data: null,
  links: null,
  meta: null,
  status: SmsProvidersListStatus.IDLE,
  error: null,
};

const smsProvidersListSlice = createSlice({
  name: 'smsproviders/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSmsProviders.pending, (state) => {
        state.status = SmsProvidersListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchSmsProviders.fulfilled, (state, action: PayloadAction<SmsProvidersListResponse>) => {
        state.status = SmsProvidersListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchSmsProviders.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsProvidersListStatus.FAILED;
        state.error = action.payload || 'Fetch sms providers failed';
      });
  },
});

export default smsProvidersListSlice.reducer;
