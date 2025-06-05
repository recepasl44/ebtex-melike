import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient'; // yolunuzu ayarlayın
import { ListOverduePaymentsResponse } from '../../../types/overduePayments/list'; // yolunuzu ayarlayın
import { OverduePaymentFilter } from '../../../enums/overduePayments/list';

interface FetchOverduePaymentsArgs {
  filter?: OverduePaymentFilter;
  page?: number;
  paginate?: number;
}

export const fetchOverduePayments = createAsyncThunk<ListOverduePaymentsResponse, FetchOverduePaymentsArgs>(
  'overduePayments/fetch',
  async (args, { rejectWithValue }) => {
    try {
      // API base URL'iniz axiosInstance'da ayarlı olmalıdır.
      let url = '/overdue-payments?';
      const params = new URLSearchParams();
      if (args.filter) params.append('filter', args.filter);
      if (args.page) params.append('page', args.page.toString());
      if (args.paginate) params.append('paginate', args.paginate.toString());
      url += params.toString();
      const response = await axiosInstance.get(url);
      return response.data as ListOverduePaymentsResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch overdue payments failed');
    }
  }
);
