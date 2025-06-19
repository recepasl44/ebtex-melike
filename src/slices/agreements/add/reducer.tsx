import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AgreementsAddState } from '../../../types/agreements/add';
import { AgreementsListStatus } from '../../../enums/agreements/list';
import { addAgreement } from './thunk';

const initialState: AgreementsAddState = {
  data: null,
  status: AgreementsListStatus.IDLE,
  error: null,
};

const agreementsAddSlice = createSlice({
  name: 'agreementsAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAgreement.pending, (state) => {
        state.status = AgreementsListStatus.LOADING;
        state.error = null;
      })
      .addCase(addAgreement.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addAgreement.rejected, (state, action: PayloadAction<any>) => {
        state.status = AgreementsListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default agreementsAddSlice.reducer;
