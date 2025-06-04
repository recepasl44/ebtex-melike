import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_INFOS } from "../../../helpers/url_helper";
import {
  StudentinfosListResponse,
  StudentinfosListArg,
} from "../../../types/studentInfos/list";

// d:\test\ebtek-yazilim-frontend-owner\src\slices\studentInfo\list\thunk.tsx
export const fetchStudentinfos = createAsyncThunk<
  StudentinfosListResponse,
  StudentinfosListArg
>(
  "studentinfos/fetchStudentinfos",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      // URL yapısını düzelt: / yerine ? kullan
      const url = `${STUDENT_INFOS}?${queryString}`;

      console.log("API isteği URL:", url); // Debug için

      const resp = await axiosInstance.get(url);
      return resp.data as StudentinfosListResponse; // .data kısmını çıkar
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch studentinfos failed"
      );
    }
  }
);
