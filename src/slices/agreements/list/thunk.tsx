import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { AGREEMENTS } from '../../../helpers/url_helper';
import { AgreementsListArg, AgreementsListResponse } from '../../../types/agreements/list';

export const fetchAgreements = createAsyncThunk<AgreementsListResponse, AgreementsListArg>(
  'agreements/fetchAgreements',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'enabled') {
          query.append(key, String(value));
        }
      });
      const url = `${AGREEMENTS}?${query.toString()}`;
      const resp = await axiosInstance.get(url);
      return resp.data as AgreementsListResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch agreements failed');
    }
  }
);
