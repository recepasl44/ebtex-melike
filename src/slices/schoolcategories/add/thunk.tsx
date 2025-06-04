import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLCATEGORIES } from "../../../helpers/url_helper";
import { SchoolCategoryData } from "../../../types/schoolcategories/list";
import { SchoolCategoriesAddPayload } from "../../../types/schoolcategories/add";

export const addSchoolCategory = createAsyncThunk<
  SchoolCategoryData,
  SchoolCategoriesAddPayload
>(
  "schoolcategories/addSchoolCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(SCHOOLCATEGORIES, payload);
      return resp.data.data as SchoolCategoryData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add school category failed"
      );
    }
  }
);
