import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTION_CURRICULUMS } from '../../../helpers/url_helper';
import { QuestionCurriculumData } from '../../../types/questioncurriculums/list';
import { QuestionCurriculumsUpdatePayload } from '../../../types/questioncurriculums/update';

export const updateQuestionCurriculum = createAsyncThunk<QuestionCurriculumData, QuestionCurriculumsUpdatePayload>(
  'questioncurriculums/updateQuestionCurriculum',
  async ({ questionCurriculumId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`${QUESTION_CURRICULUMS}/${questionCurriculumId}`, payload);
      return response.data.data as QuestionCurriculumData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Update questionCurriculum failed');
    }
  }
);
