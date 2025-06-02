import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgreementsDetailState } from '../../../types/agreements/detail';
import { AgreementsListStatus } from '../../../enums/agreements/list';
import { fetchAgreement } from './thunk';

const initialState: AgreementsDetailState = {
  data: null,
  status: AgreementsListStatus.IDLE,
  error: null,
};

const agreementsDetailSlice = createSlice({
  name: 'agreementsDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgreement.pending, (state) => {
        state.status = AgreementsListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchAgreement.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchAgreement.rejected, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default agreementsDetailSlice.reducer;
