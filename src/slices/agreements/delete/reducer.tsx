import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgreementsDeleteState } from '../../../types/agreements/delete';
import { AgreementsListStatus } from '../../../enums/agreements/list';
import { deleteAgreement } from './thunk';

const initialState: AgreementsDeleteState = {
  data: null,
  status: AgreementsListStatus.IDLE,
  error: null,
};

const agreementsDeleteSlice = createSlice({
  name: 'agreementsDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAgreement.pending, (state) => {
        state.status = AgreementsListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteAgreement.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteAgreement.rejected, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default agreementsDeleteSlice.reducer;
