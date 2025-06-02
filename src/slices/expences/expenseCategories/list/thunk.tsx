import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCE_CATEGORIES } from "../../../../helpers/url_helper";
import {
  ExpenseCategoriesListResponse,
  ExpenseCategoriesListArgs,
} from "../../../../types/expences/expenseCategories/list";

export const fetchExpenseCategoriesList = createAsyncThunk<
  ExpenseCategoriesListResponse,
  ExpenseCategoriesListArgs
>(
  "expenseCategories/fetchExpenseCategoriesList",
  async (queryParams, { rejectWithValue }) => {
    try {
      const { page = 1, pageSize = 10, searchTerm = "" } = queryParams;
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        searchTerm,
      });
      const url = `${EXPENCE_CATEGORIES}?${params.toString()}`;
      const response = await axiosInstance.get(url);
      return response.data as ExpenseCategoriesListResponse;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch expense categories failed"
      );
    }
  }
);
