import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ESTIMATED_BUDGETS } from '../../../helpers/url_helper';
import { EstimatedBudgetListResponse } from '../../../types/estimatedBudget/list';

export const fetchEstimatedBudgets = createAsyncThunk<
  EstimatedBudgetListResponse
>('estimatedBudget/fetchList', async (_, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.get(ESTIMATED_BUDGETS);
    return resp.data as EstimatedBudgetListResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || 'Fetch estimated budgets failed'
    );
  }
});
