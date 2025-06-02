import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { COURSES } from "../../../helpers/url_helper";
import { ListCourseResponse,CourseListArg } from "../../../types/courses/list";

export const fetchCourses = createAsyncThunk<ListCourseResponse, CourseListArg>(
  "courses/fetchCourses",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value)); 
        }
      });
      const queryString = new URLSearchParams(queryParams).toString();
      const url = `${COURSES}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as ListCourseResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch courses failed");
    }
  }
);
