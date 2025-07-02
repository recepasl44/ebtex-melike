import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTION_CURRICULUMS } from '../../../helpers/url_helper';
import { QuestionCurriculumData } from '../../../types/questioncurriculums/list';
import { QuestionCurriculumsAddPayload } from '../../../types/questioncurriculums/add';

export const addQuestionCurriculum = createAsyncThunk<QuestionCurriculumData, QuestionCurriculumsAddPayload>(
  'questioncurriculums/addQuestionCurriculum',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${QUESTION_CURRICULUMS}`, payload);
      return resp.data.data as QuestionCurriculumData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Add questionCurriculums failed');
    }
  }
);
