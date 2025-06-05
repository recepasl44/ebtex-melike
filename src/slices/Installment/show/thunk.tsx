
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTALLMENTS } from '../../../helpers/url_helper';
import {
  ShowInstallmentPayload,
  ShowInstallmentResponse,
} from '../../../types/Installment/show';

export const showInstallment = createAsyncThunk<
  ShowInstallmentResponse,
  ShowInstallmentPayload,
  { rejectValue: string }
>(
  'installment/show',
  async ({ installmentId }, { rejectWithValue }) => {
    try {
      const url = `${INSTALLMENTS}/${installmentId}`;
      const resp = await axiosInstance.get(url);
      return resp.data.data as ShowInstallmentResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Show installment failed');
    }
  }
);
