import {createAsyncThunk} from "@reduxjs/toolkit";
import {QuizResultsListArg, QuizResultsListResponse} from "../../types/quizResult/list";
import axiosInstance from "../../services/axiosClient";
import {QUIZ_RESULTS} from "../../helpers/url_helper";


export const fetchQuizResults = createAsyncThunk<QuizResultsListResponse, QuizResultsListArg>(
  'quizresults/fetchQuizResults',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'enabled') {
          query.append(key, String(value));
        }
      });
      const url = `${QUIZ_RESULTS}?${query.toString()}`;
      const resp = await axiosInstance.get(url);
      return resp.data as QuizResultsListResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch quiz results failed');
    }
  }
);
