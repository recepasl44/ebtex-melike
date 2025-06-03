import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CHAPTERS } from '../../../helpers/url_helper';
import { ChaptersUpdatePayload } from '../../../types/chapters/update';
import { data } from '../../../types/chapters/list';

export const updateChapter = createAsyncThunk<data, ChaptersUpdatePayload>(
    'chapters/updateChapter',
    async ({ chapterId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${CHAPTERS}/${chapterId}`, payload);
            return resp.data.data as data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update chapter failed');
        }
    }
);
