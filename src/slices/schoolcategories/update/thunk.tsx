import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOLCATEGORIES } from "../../../helpers/url_helper";
import { SchoolCategoryData } from "../../../types/schoolcategories/list";
import { SchoolCategoriesUpdatePayload } from "../../../types/schoolcategories/update";

export const updateSchoolCategory = createAsyncThunk<
  SchoolCategoryData,
  SchoolCategoriesUpdatePayload
>(
  "schoolcategories/updateSchoolCategory",
  async ({ categoryId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${SCHOOLCATEGORIES}/${categoryId}`,
        payload
      );
      return resp.data.data as SchoolCategoryData;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update school category failed"
      );
    }
  }
);
