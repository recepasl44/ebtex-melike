import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCE_CATEGORIES } from "../../../../helpers/url_helper";
import { ExpenseCategoriesUpdatePayload } from "../../../../types/expences/expenseCategories/update";
import { IExpenseCategories } from "../../../../types/expences/expenseCategories/list";

export const updateExpenseCategory = createAsyncThunk<
  IExpenseCategories,
  ExpenseCategoriesUpdatePayload
>(
  "expenseCategories/updateExpenseCategory",
  async ({ expenseCategoryId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${EXPENCE_CATEGORIES}/${expenseCategoryId}`,
        payload
      );
      return resp.data.data as IExpenseCategories;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update expense category failed"
      );
    }
  }
);
