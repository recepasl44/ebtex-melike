
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTALLMENTS } from '../../../helpers/url_helper';
import {
  UpdateInstallmentPayload,
  UpdateInstallmentResponse,
} from '../../../types/Installment/update';

export const updateInstallment = createAsyncThunk<
  UpdateInstallmentResponse,
  UpdateInstallmentPayload,
  { rejectValue: string }
>(
  'installment/update',
  async ({ installmentId, body }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${INSTALLMENTS}/${installmentId}`, body);
      return resp.data.data as UpdateInstallmentResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Update installment failed'
      );
    }
  }
);
