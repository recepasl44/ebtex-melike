import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { COURSES } from "../../../helpers/url_helper";
import { CoursesDeleteState } from "../../../types/courses/delete";

export const deleteCourse = createAsyncThunk<CoursesDeleteState, number>(
  "courses/deleteCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${COURSES}/${courseId}`);
      return resp.data as CoursesDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "delete course failed"
      );
    }
  }
);
