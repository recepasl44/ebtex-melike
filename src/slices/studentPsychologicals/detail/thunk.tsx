import { createAsyncThunk } from "@reduxjs/toolkit";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_PSYCHOLOGICALS } from "../../../helpers/url_helper";

export const fetchStudentPsychological = createAsyncThunk<
  StudentPsychologicalData,
  number
>(
  "studentpsychologicals/fetchStudentPsychological",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${STUDENT_PSYCHOLOGICALS}/${id}`
      );
      return response.data.data as StudentPsychologicalData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch student psychological failed"
      );
    }
  }
);
