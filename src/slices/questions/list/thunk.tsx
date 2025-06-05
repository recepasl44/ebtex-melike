import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTIONS } from '../../../helpers/url_helper';
import { ListQuestionsResponse, QuestionsListArg } from '../../../types/questions/list';

export const fetchQuestions = createAsyncThunk<ListQuestionsResponse, QuestionsListArg>(
  'questions/fetchQuestions',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value)); 
        }
      });
      const queryString = query.toString();
      const url = `${QUESTIONS}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListQuestionsResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch questions failed');
    }
  }
);
