import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIncomes } from './thunk';
import { ListIncomeResponse } from '../../../types/income/list';
import { IncomeListStatus } from '../../../enums/income/list';

export interface IncomeListState {
  data: ListIncomeResponse['data'] | null;
  links: ListIncomeResponse['links'] | null;
  meta: ListIncomeResponse['meta'] | null;
  status: IncomeListStatus;
  error: string | null;
}

const initialState: IncomeListState = {
  data: null,
  links: null,
  meta: null,
  status: IncomeListStatus.IDLE,
  error: null,
};

const incomeListSlice = createSlice({
  name: 'income/list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIncomes.pending, (state) => {
      state.status = IncomeListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchIncomes.fulfilled, (state, action: PayloadAction<ListIncomeResponse>) => {
      state.status = IncomeListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchIncomes.rejected, (state, action: PayloadAction<any>) => {
      state.status = IncomeListStatus.FAILED;
      state.error = action.payload || 'Fetch incomes failed';
    });
  },
});

export default incomeListSlice.reducer;
