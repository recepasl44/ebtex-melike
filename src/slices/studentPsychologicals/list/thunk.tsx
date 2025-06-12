import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  StudentPsychologicalListArg,
  StudentPsychologicalListResponse,
} from "../../../types/studentPsychologicals/list";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_PSYCHOLOGICALS } from "../../../helpers/url_helper";

export const fetchStudentPsychologicals = createAsyncThunk<
  StudentPsychologicalListResponse,
  StudentPsychologicalListArg
>(
  "studentpsychologicals/fetchStudentPsychologicals",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${STUDENT_PSYCHOLOGICALS}?${queryString}`;
      const response = await axiosInstance.get(url);
      return response.data as StudentPsychologicalListResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch student psychologicals failed"
      );
    }
  }
);
