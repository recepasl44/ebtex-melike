import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { AGREEMENTS } from '../../../helpers/url_helper';
import { AgreementsAddPayload, AgreementsAddResponse } from '../../../types/agreements/add';

export const addAgreement = createAsyncThunk<AgreementsAddResponse, AgreementsAddPayload>(
  'agreements/addAgreement',
  async (agreementData, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${AGREEMENTS}/generateContractPdf/${agreementData.student_id}`, agreementData);
      return resp.data as AgreementsAddResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add agreement failed');
    }
  }
);
