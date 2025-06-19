
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTALLMENTS } from '../../../helpers/url_helper';
import {
  CreateInstallmentPayload,
  CreateInstallmentResponse,
} from '../../../types/Installment/add';

export const createInstallment = createAsyncThunk<
  CreateInstallmentResponse,
  CreateInstallmentPayload,
  { rejectValue: string }
>(
  'installment/add',
  async (body, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(INSTALLMENTS, body);
      return resp.data.data as CreateInstallmentResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Create installment failed'
      );
    }
  }
);
