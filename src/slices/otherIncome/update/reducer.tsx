import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateOtherIncome } from './thunk';
import { OtherIncomeUpdateState } from '../../../types/otherIncome/update';
import { OtherIncomeListStatus } from '../../../enums/otherIncome/list';

const initialState: OtherIncomeUpdateState = {
  data: null,
  status: OtherIncomeListStatus.IDLE,
  error: null,
};

const updateSlice = createSlice({
  name: 'otherIncomeUpdate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOtherIncome.pending, (state) => {
        state.status = OtherIncomeListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateOtherIncome.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(updateOtherIncome.rejected, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default updateSlice.reducer;
