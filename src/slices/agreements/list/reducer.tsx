import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgreementsListResponse } from '../../../types/agreements/list';
import { AgreementsListStatus } from '../../../enums/agreements/list';
import { fetchAgreements } from './thunk';

export interface AgreementsListState {
  data: AgreementsListResponse['data'] | null;
  links: AgreementsListResponse['links'] | null;
  meta: AgreementsListResponse['meta'] | null;
  status: AgreementsListStatus;
  error: string | null;
}

const initialState: AgreementsListState = {
  data: null,
  links: null,
  meta: null,
  status: AgreementsListStatus.IDLE,
  error: null,
};

const agreementsListSlice = createSlice({
  name: 'agreementsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgreements.pending, (state) => {
        state.status = AgreementsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchAgreements.fulfilled, (state, action: PayloadAction<AgreementsListResponse>) => {
        state.status = AgreementsListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      })
      .addCase(fetchAgreements.rejected, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.FAILED;
        state.error = action.payload || 'Fetch agreements failed';
      });
  },
});

export default agreementsListSlice.reducer;
