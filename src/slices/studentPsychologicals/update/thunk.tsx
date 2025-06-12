import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";
import { StudentPsychologicalUpdatePayload } from "../../../types/studentPsychologicals/update";
import { STUDENT_PSYCHOLOGICALS } from "../../../helpers/url_helper";

export const updateStudentPsychological = createAsyncThunk<
  StudentPsychologicalData,
  StudentPsychologicalUpdatePayload
>(
  "studentpsychologicals/updateStudentPsychological",
  async ({ psychologicalId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${STUDENT_PSYCHOLOGICALS}/${psychologicalId}`,
        payload
      );
      return response.data.data as StudentPsychologicalData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Update student psychological failed"
      );
    }
  }
);
