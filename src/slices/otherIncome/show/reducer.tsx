import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showOtherIncome } from './thunk';
import { OtherIncomeShowState } from '../../../types/otherIncome/show';
import { OtherIncomeListStatus } from '../../../enums/otherIncome/list';

const initialState: OtherIncomeShowState = {
  data: null,
  status: OtherIncomeListStatus.IDLE,
  error: null,
};

const showSlice = createSlice({
  name: 'otherIncomeShow',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showOtherIncome.pending, (state) => {
        state.status = OtherIncomeListStatus.LOADING;
        state.error = null;
      })
      .addCase(showOtherIncome.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(showOtherIncome.rejected, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default showSlice.reducer;
