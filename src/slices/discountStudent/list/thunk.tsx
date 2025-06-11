import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DISCOUNT_STUDENT } from '../../../helpers/url_helper'; // Örneğin: "https://anlakogrenme.com/api/v1/enrollment-reports" ya da uygun endpoint
import { ListDiscountStudentResponse } from '../../../types/discountStudent/list';

interface DiscountStudentListArgs {
  page?: number;
  paginate?: number;
  school_level?: string;
  class_level?: string;
  class_branch?: string;
  full_name?: string;
}

export const fetchDiscountStudents = createAsyncThunk<ListDiscountStudentResponse, DiscountStudentListArgs>(
  'discountStudent/fetchDiscountStudents',
  async (
    { page = 1, paginate = 25, school_level, class_level, class_branch, full_name },
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('paginate', String(paginate));
      if (school_level) params.append('school_level', school_level);
      if (class_level) params.append('class_level', class_level);
      if (class_branch) params.append('class_branch', class_branch);
      if (full_name) params.append('full_name', full_name);

      const url = `${DISCOUNT_STUDENT}?${params.toString()}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListDiscountStudentResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch discount students failed');
    }
  }
);
