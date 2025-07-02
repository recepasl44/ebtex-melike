import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { QUESTION_CURRICULUMS } from '../../../helpers/url_helper';
import { QuestionCurriculumData } from '../../../types/questioncurriculums/list';

export const deleteQuestionCurriculum = createAsyncThunk<QuestionCurriculumData, number>(
  'questioncurriculums/deleteQuestionCurriculum',
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${QUESTION_CURRICULUMS}/${id}`);
      return resp.data.data as QuestionCurriculumData;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Delete questionCurriculums failed');
    }
  }
);
