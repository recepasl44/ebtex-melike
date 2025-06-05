import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteOtherIncome } from './thunk';
import { OtherIncomeDeleteState } from '../../../types/otherIncome/delete';
import { OtherIncomeListStatus } from '../../../enums/otherIncome/list';

const initialState: OtherIncomeDeleteState = {
  data: null,
  status: OtherIncomeListStatus.IDLE,
  error: null,
};

const deleteSlice = createSlice({
  name: 'otherIncomeDelete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteOtherIncome.pending, (state) => {
        state.status = OtherIncomeListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteOtherIncome.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(deleteOtherIncome.rejected, (state, action: PayloadAction<any>) => {
        state.status = OtherIncomeListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default deleteSlice.reducer;
