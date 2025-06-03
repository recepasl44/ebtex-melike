import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCE_CATEGORIES } from "../../../../helpers/url_helper";
import { GetCategoriesListStatus } from "../../../../enums/expense/expenseCategories/list";

export const fetchExpenseCategories = createAsyncThunk<
  GetCategoriesListStatus,
  number
>(
  "expenseCategory/fetchExpenseCategories",
  async (expenseCategoryId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${EXPENCE_CATEGORIES}/${expenseCategoryId}`
      );
      return response.data.data as GetCategoriesListStatus;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch expense categories failed"
      );
    }
  }
);
