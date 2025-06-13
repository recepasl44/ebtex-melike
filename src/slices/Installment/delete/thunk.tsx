
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { INSTALLMENTS } from '../../../helpers/url_helper';
import {
  DeleteInstallmentPayload,
  DeleteInstallmentResponse,
} from '../../../types/Installment/delete';

export const deleteInstallment = createAsyncThunk<
  DeleteInstallmentResponse,
  DeleteInstallmentPayload,
  { rejectValue: string }
>(
  'installment/delete',
  async ({ installmentId }, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${INSTALLMENTS}/${installmentId}`);
      return { deletedId: installmentId };
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Delete installment failed'
      );
    }
  }
);
