import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { SpecialTutorLessonDeleteState } from "../../../../types/employee/special_tutor_lesson/delete";
import { SPECIAL_TUTOR_LESSON_BASE } from "../../../../helpers/url_helper";

export const deleteSpecialTutorLesson = createAsyncThunk<
  SpecialTutorLessonDeleteState["data"],
  number
>(
  "specialTutorLesson/delete",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(`${SPECIAL_TUTOR_LESSON_BASE}/${id}`);
      return resp.data.data; // number | null
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete special tutor lesson failed"
      );
    }
  }
);
