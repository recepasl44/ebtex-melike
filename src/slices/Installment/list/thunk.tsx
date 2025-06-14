
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTALLMENTS } from '../../../helpers/url_helper';
import {
  ListInstallmentsResponse,
  ListInstallmentsArgs
} from '../../../types/Installment/list';


export const listInstallments = createAsyncThunk<
  ListInstallmentsResponse,           
  ListInstallmentsArgs,
  { rejectValue: string }             
>(
  'installment/list',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value)); 
        }
      });
      const queryString = query.toString();
      const url = `${INSTALLMENTS}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListInstallmentsResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch Transfer failed');
    }
  }
);
