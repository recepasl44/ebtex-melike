import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCE_CATEGORIES } from "../../../../helpers/url_helper";
import { ExpenseCategoryAddPayload } from "../../../../types/expences/expenseCategories/add";
import { IExpenseCategories } from "../../../../types/expences/expenseCategories/list";

export const addExpenseCategories = createAsyncThunk<
  IExpenseCategories,
  ExpenseCategoryAddPayload
>("expense/addExpense", async (payload, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.post(EXPENCE_CATEGORIES, payload);
    return resp.data.data as IExpenseCategories;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Add expense failed");
  }
});
