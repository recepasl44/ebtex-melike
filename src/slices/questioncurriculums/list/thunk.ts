import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTION_CURRICULUMS } from '../../../helpers/url_helper';
import { QuestionCurriculumsListResponse, QuestionCurriculumsListArg } from '../../../types/questioncurriculums/list';

export const fetchQuestionCurriculums = createAsyncThunk<QuestionCurriculumsListResponse, QuestionCurriculumsListArg>(
  'questioncurriculums/fetchQuestionCurriculums',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'enabled') {
          query.append(key, String(value));
        }
      });
      const qs = query.toString();
      const url = `${QUESTION_CURRICULUMS}${qs ? `?${qs}` : ''}`;
      const resp = await axiosInstance.get(url);
      return resp.data as QuestionCurriculumsListResponse;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Fetch questionCurriculums failed');
    }
  }
);
