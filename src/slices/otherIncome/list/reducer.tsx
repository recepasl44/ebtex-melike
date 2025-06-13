import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchOtherIncomes } from './thunk';
import { OtherIncomeListState, OtherIncomeListResponse } from '../../../types/otherIncome/list';
import { OtherIncomeListStatus } from '../../../enums/otherIncome/list';

const initialState: OtherIncomeListState = {
  data: null,
  links: null,
  meta: null,
  status: OtherIncomeListStatus.IDLE,
  error: null,
};

const otherIncomeListSlice = createSlice({
  name: 'otherIncome/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOtherIncomes.pending, (state) => {
      state.status = OtherIncomeListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchOtherIncomes.fulfilled,
      (state, action: PayloadAction<OtherIncomeListResponse>) => {
        state.status = OtherIncomeListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(fetchOtherIncomes.rejected, (state, action: PayloadAction<any>) => {
      state.status = OtherIncomeListStatus.FAILED;
      state.error = action.payload || 'Fetch other incomes failed';
    });
  },
});

export default otherIncomeListSlice.reducer;
