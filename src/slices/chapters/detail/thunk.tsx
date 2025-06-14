import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { CHAPTERS } from '../../../helpers/url_helper';
import { ChapterShowState } from '../../../types/chapters/detail';

export const fetchChapter = createAsyncThunk<ChapterShowState, number>(
    'chapter/fetchChapter',
    async (chapterId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${CHAPTERS}/${chapterId}`);
            return response.data.data as ChapterShowState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || 'Fetch chapter failed'
            );
        }
    }
);
