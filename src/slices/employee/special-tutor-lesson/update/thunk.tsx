import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  SpecialTutorLessonUpdatePayload,
  SpecialTutorLessonUpdateResponse,
} from "../../../../types/employee/special_tutor_lesson/update";
import { SPECIAL_TUTOR_LESSON_BASE } from "../../../../helpers/url_helper";

export const updateSpecialTutorLesson = createAsyncThunk<
  SpecialTutorLessonUpdateResponse["data"],
  SpecialTutorLessonUpdatePayload
>(
  "specialTutorLesson/update",
  async ({ specialTutorLessonId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${SPECIAL_TUTOR_LESSON_BASE}/${specialTutorLessonId}`,
        payload
      );
      return resp.data.data; 
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update special tutor lesson failed"
      );
    }
  }
);
