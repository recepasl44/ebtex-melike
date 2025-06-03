import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { AGREEMENTS } from '../../../helpers/url_helper';
import { AgreementsUpdatePayload, AgreementsUpdateResponse } from '../../../types/agreements/update';

export const updateAgreement = createAsyncThunk<AgreementsUpdateResponse, AgreementsUpdatePayload>(
  'agreements/updateAgreement',
  async ({ agreementId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${AGREEMENTS}/${agreementId}`, payload);
      return resp.data as AgreementsUpdateResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update agreement failed');
    }
  }
);
