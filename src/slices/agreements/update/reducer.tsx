import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgreementsUpdateState } from '../../../types/agreements/update';
import { AgreementsListStatus } from '../../../enums/agreements/list';
import { updateAgreement } from './thunk';

const initialState: AgreementsUpdateState = {
  data: null,
  status: AgreementsListStatus.IDLE,
  error: null,
};

const agreementsUpdateSlice = createSlice({
  name: 'agreementsUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateAgreement.pending, (state) => {
        state.status = AgreementsListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateAgreement.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateAgreement.rejected, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default agreementsUpdateSlice.reducer;
