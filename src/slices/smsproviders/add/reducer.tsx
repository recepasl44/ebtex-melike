import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addSmsProvider } from './thunk';
import { AddSmsProviderState } from '../../../types/smsproviders/add';
import SmsProvidersListStatus from '../../../enums/smsproviders/list';
import { SmsProvider } from '../../../types/smsproviders/list';

const initialState: AddSmsProviderState = {
  data: null,
  status: SmsProvidersListStatus.IDLE,
  error: null,
};

const addSmsProviderSlice = createSlice({
  name: 'smsproviders/add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSmsProvider.pending, (state) => {
        state.status = SmsProvidersListStatus.LOADING;
        state.error = null;
      })
      .addCase(addSmsProvider.fulfilled, (state, action: PayloadAction<SmsProvider>) => {
        state.status = SmsProvidersListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addSmsProvider.rejected, (state, action: PayloadAction<any>) => {
        state.status = SmsProvidersListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default addSmsProviderSlice.reducer;
