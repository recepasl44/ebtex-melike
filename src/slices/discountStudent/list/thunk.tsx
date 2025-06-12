import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { DISCOUNT_STUDENT } from '../../../helpers/url_helper'; // Örneğin: "https://anlakogrenme.com/api/v1/enrollment-reports" ya da uygun endpoint
import { ListDiscountStudentResponse } from '../../../types/discountStudent/list';

interface DiscountStudentListArgs {
  searchTerm?: string;
  page?: number;
  paginate?: number;
}

export const fetchDiscountStudents = createAsyncThunk<ListDiscountStudentResponse, DiscountStudentListArgs>(
  'discountStudent/fetchDiscountStudents',
  async ({ searchTerm = "", page = 1, paginate = 25 }, { rejectWithValue }) => {
    try {
      let url = `${DISCOUNT_STUDENT}?page=${page}&paginate=${paginate}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const resp = await axiosInstance.get(url);
      return resp.data as ListDiscountStudentResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch discount students failed');
    }
  }
);
