import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLCATEGORIES } from "../../../helpers/url_helper";

import { SchoolCategoryData } from "../../../types/schoolcategories/list";

export const fetchSchoolCategory = createAsyncThunk<SchoolCategoryData, number>(
  "schoolcategories/fetchSchoolCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${SCHOOLCATEGORIES}/${categoryId}`);
      return resp.data.data as SchoolCategoryData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch school category failed"
      );
    }
  }
);
