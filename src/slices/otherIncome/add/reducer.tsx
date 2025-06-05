import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addOtherIncome } from './thunk';
import { OtherIncomeAddState } from '../../../types/otherIncome/add';
import { OtherIncomeListStatus } from '../../../enums/otherIncome/list';

const initialState: OtherIncomeAddState = {
  data: null,
  status: OtherIncomeListStatus.IDLE,
  error: null,
};

const addSlice = createSlice({
  name: 'otherIncomeAdd',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOtherIncome.pending, (state) => {
        state.status = OtherIncomeListStatus.LOADING;
        state.error = null;
      })
      .addCase(addOtherIncome.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addOtherIncome.rejected, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default addSlice.reducer;
