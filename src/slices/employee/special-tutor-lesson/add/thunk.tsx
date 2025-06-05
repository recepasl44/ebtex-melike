import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  SpecialTutorLessonAddPayload,
  SpecialTutorLessonAddState,
} from "../../../../types/employee/special_tutor_lesson/add";
import { SPECIAL_TUTOR_LESSON_BASE } from "../../../../helpers/url_helper";

export const addSpecialTutorLesson = createAsyncThunk<
  SpecialTutorLessonAddState["data"],
  SpecialTutorLessonAddPayload
>(
  "specialTutorLesson/add",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(`${SPECIAL_TUTOR_LESSON_BASE}`, payload);
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add special tutor lesson failed"
      );
    }
  }
);
