import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENTS } from "../../../helpers/url_helper";
import {
  UpdateStudentPayload,
  UpdateStudentResponse,
} from "../../../types/student/update";

export const updateStudent = createAsyncThunk<
  UpdateStudentResponse,
  UpdateStudentPayload
>(
  "student/update/updateStudent",
  async ({ studentId, payload }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `${STUDENTS}/${studentId}`,
        payload
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update student failed"
      );
    }
  }
);
