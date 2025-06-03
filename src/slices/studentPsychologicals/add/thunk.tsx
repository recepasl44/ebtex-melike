import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_PSYCHOLOGICALS } from "../../../helpers/url_helper";
import { StudentPsychologicalData } from "../../../types/studentPsychologicals/list";
import { StudentPsychologicalAddPayload } from "../../../types/studentPsychologicals/add";

export const addStudentPsychological = createAsyncThunk<
  StudentPsychologicalData,
  StudentPsychologicalAddPayload
>(
  "studentpsychologicals/addStudentPsychological",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        STUDENT_PSYCHOLOGICALS,
        payload
      );
      return response.data.data as StudentPsychologicalData;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Add student psychological failed"
      );
    }
  }
);
