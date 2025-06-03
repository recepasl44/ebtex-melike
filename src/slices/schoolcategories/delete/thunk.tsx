import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLCATEGORIES } from "../../../helpers/url_helper";
import { SchoolCategoriesDeleteState } from "../../../types/schoolcategories/delete";
import { SchoolCategoryData } from "../../../types/schoolcategories/list";

export const deleteSchoolCategory = createAsyncThunk<
  SchoolCategoriesDeleteState,
  number
>(
  "schoolcategories/deleteSchoolCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(
        `${SCHOOLCATEGORIES}/${categoryId}`
      );
      const data = resp.data.data as SchoolCategoryData | null;
      return {
        data,
        status: resp.status === 200 ? "SUCCEEDED" : "FAILED",
        error: null,
      } as SchoolCategoriesDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete school category failed"
      );
    }
  }
);
