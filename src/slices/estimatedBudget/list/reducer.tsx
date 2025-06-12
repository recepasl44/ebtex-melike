import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EstimatedBudgetListState,
  EstimatedBudgetListResponse,
} from '../../../types/estimatedBudget/list';
import { EstimatedBudgetStatus } from '../../../enums/estimatedBudget/list';
import { fetchEstimatedBudgets } from './thunk';

const initialState: EstimatedBudgetListState = {
  data: null,
  student_count: 0,
  total: 0,
  per_student: 0,
  status: EstimatedBudgetStatus.IDLE,
  error: null,
};

const estimatedBudgetListSlice = createSlice({
  name: 'estimatedBudgetList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstimatedBudgets.pending, (state) => {
        state.status = EstimatedBudgetStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchEstimatedBudgets.fulfilled,
        (state, action: PayloadAction<EstimatedBudgetListResponse>) => {
          state.status = EstimatedBudgetStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.student_count = action.payload.student_count;
          state.total = action.payload.total;
          state.per_student = action.payload.per_student;
        }
      )
      .addCase(fetchEstimatedBudgets.rejected, (state, action: PayloadAction<any>) => {
        state.status = EstimatedBudgetStatus.FAILED;
        state.error = action.payload || 'Fetch estimated budgets failed';
      });
  },
});

export default estimatedBudgetListSlice.reducer;
