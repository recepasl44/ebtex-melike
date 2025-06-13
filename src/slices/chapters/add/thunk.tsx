import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CHAPTERS } from '../../../helpers/url_helper';
import { ChaptersAddPayload } from '../../../types/chapters/add';
import { data } from '../../../types/chapters/list';

export const addChapter = createAsyncThunk<data, ChaptersAddPayload>(
    'chapters/addChapter',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(CHAPTERS, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add chapter failed');
        }
    }
);
