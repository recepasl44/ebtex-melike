import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CHAPTERS } from '../../../helpers/url_helper';
import { ListChapterResponse, ChapterListArg } from '../../../types/chapters/list';

export const fetchChapters = createAsyncThunk<ListChapterResponse, ChapterListArg>(
    'chapters/fetchChapters',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    query.append(key, String(value));
                }
            });
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${CHAPTERS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ListChapterResponse;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch chapters failed');
        }
    }
);
