import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CHAPTERS } from '../../../helpers/url_helper';
import { ChaptersDeleteState } from '../../../types/chapters/delete';

export const deleteChapter = createAsyncThunk<ChaptersDeleteState, number>(
    'chapters/deleteChapter',
    async (chapterId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${CHAPTERS}/${chapterId}`);
            return resp.data as ChaptersDeleteState;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete chapter failed');
        }
    }
);
