import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLCATEGORIES } from "../../../helpers/url_helper";
import {
  SchoolCategoriesListArg,
  SchoolCategoriesListResponse,
} from "../../../types/schoolcategories/list";

export const fetchSchoolCategories = createAsyncThunk<
  SchoolCategoriesListResponse,
  SchoolCategoriesListArg
>(
  "schoolcategories/fetchSchoolCategories",
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== "enabled") {
          query.append(key, String(value));
        }
      });
      const queryString = query.toString();
      const url = `${SCHOOLCATEGORIES}?${queryString}`;
      const resp = await axiosInstance.get(url);
      return resp.data as SchoolCategoriesListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch school categories failed"
      );
    }
  }
);
