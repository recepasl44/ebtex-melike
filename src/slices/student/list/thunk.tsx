import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENTS } from "../../../helpers/url_helper";
import { ListStudentResponse } from "../../../types/student/list";

export interface FetchStudentsArgs {
  [key: string]: any;
  enabled?: boolean;
}

export const fetchStudents = createAsyncThunk<
  ListStudentResponse,
  FetchStudentsArgs
>("student/list/fetchStudents", async (params, { rejectWithValue }) => {
  try {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && key) {
        query.append(key, String(value));
      }
    });
    const response = await axiosInstance.get(`${STUDENTS}?${query.toString()}`);
    return response.data as ListStudentResponse;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Fetch students failed"
    );
  }
});
