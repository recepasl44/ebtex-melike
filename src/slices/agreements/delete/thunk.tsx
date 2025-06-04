import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { AGREEMENTS } from '../../../helpers/url_helper';
import { AgreementsDeleteResponse } from '../../../types/agreements/delete';

export const deleteAgreement = createAsyncThunk<AgreementsDeleteResponse, number>(
  'agreements/deleteAgreement',
  async (agreementId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${AGREEMENTS}/${agreementId}`);
      return resp.data as AgreementsDeleteResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete agreement failed');
    }
  }
);
