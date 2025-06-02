import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { SpecialTutorLesson } from "../../../../types/employee/special_tutor_lesson/list";
import { SPECIAL_TUTOR_LESSON_BASE } from "../../../../helpers/url_helper";

export const fetchSpecialTutorLessonDetail = createAsyncThunk<
  SpecialTutorLesson,
  number
>(
  "specialTutorLesson/fetchDetail",
  async (lessonId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SPECIAL_TUTOR_LESSON_BASE}/${lessonId}`);
      return resp.data.data as SpecialTutorLesson;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch special tutor lesson detail failed"
      );
    }
  }
);
