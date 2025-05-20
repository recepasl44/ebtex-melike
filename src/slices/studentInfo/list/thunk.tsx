import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_INFOS } from "../../../helpers/url_helper";
import {
  StudentinfosListResponse,
  StudentinfosListArg,
} from "../../../types/studentInfos/list";

export const fetchStudentinfos = createAsyncThunk<
  StudentinfosListResponse,
  StudentinfosListArg
>(
  "studentinfos/fetchStudentinfos",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${STUDENT_INFOS}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as StudentinfosListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch studentinfos failed"
      );
    }
  }
);
