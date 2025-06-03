import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCE_CATEGORIES } from "../../../../helpers/url_helper";

export const deleteExpenseCategories = createAsyncThunk<number, number>(
  "expenseCategory/deleteExpenseCategory",
  async (expenseCategoryId, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`${EXPENCE_CATEGORIES}/${expenseCategoryId}`);
      return expenseCategoryId;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete expense category failed"
      );
    }
  }
);
