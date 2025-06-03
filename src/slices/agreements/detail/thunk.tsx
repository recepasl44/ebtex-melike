import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { AGREEMENTS } from '../../../helpers/url_helper';
import { AgreementDetailItem } from '../../../types/agreements/detail';

export const fetchAgreement = createAsyncThunk<AgreementDetailItem, number>(
  'agreements/fetchAgreement',
  async (agreementId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${AGREEMENTS}/${agreementId}`);
      return resp.data.data as AgreementDetailItem;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch agreement failed');
    }
  }
);
