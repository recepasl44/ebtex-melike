import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_PSYCHOLOGICALS } from "../../../helpers/url_helper";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";

export const deleteStudentPsychological = createAsyncThunk<
  StudentPsychologicalData,
  number
>(
  "studentpsychologicals/deleteStudentPsychological",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${STUDENT_PSYCHOLOGICALS}/${id}`
      );
      return response.data.data as StudentPsychologicalData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Delete student psychological failed"
      );
    }
  }
);
