import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLS } from "../../../helpers/url_helper";
import { ISchool } from "../../../types/schools/list";

export const fetchSchool = createAsyncThunk<ISchool, number>(
  "school/fetchSchool",
  async (schoolId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${SCHOOLS}/${schoolId}`);
      return response.data.data as ISchool;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch school failed"
      );
    }
  }
);
