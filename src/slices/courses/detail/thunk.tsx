import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { COURSES } from "../../../helpers/url_helper";
import { CourseShowState } from "../../../types/courses/detail";

export const fetchCourse = createAsyncThunk<CourseShowState, number>(
  "course/fetchCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${COURSES}/${courseId}`);
      return response.data.data as CourseShowState;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch course failed"
      );
    }
  });
