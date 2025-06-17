import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import {
  SpecialTutorLessonListResponse,
  SpecialTutorLessonListArgs,
} from "../../../../types/employee/special_tutor_lesson/list";
import { SPECIAL_TUTOR_LESSON_BASE } from "../../../../helpers/url_helper";

// Önceki istekleri tutacak hafıza (global context dışında değilse bile sabit olur)
const previousRequestKeys = new Set<string>();

export const fetchSpecialTutorLessonList = createAsyncThunk<
  SpecialTutorLessonListResponse,
  SpecialTutorLessonListArgs
>(
  "specialTutorLesson/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });

      const resp = await axiosInstance.get(
        `${SPECIAL_TUTOR_LESSON_BASE}/index?${query.toString()}`
      );
      return resp.data as SpecialTutorLessonListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch special tutor lesson list failed"
      );
    }
  },
  {
    condition: (params) => {
      const key = JSON.stringify(params);

      // Aynı parametrelerle daha önce çağrıldıysa tekrar çağırma
      if (previousRequestKeys.has(key)) {
        return false;
      }

      // Yeni ise cache'e ekle ve izin ver
      previousRequestKeys.add(key);
      return true;
    },
  }
);
