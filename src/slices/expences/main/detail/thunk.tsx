import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCES } from "../../../../helpers/url_helper";
import { ExpenseListStatus } from "../../../../enums/expense/main/list";

export const fetchExpense = createAsyncThunk<ExpenseListStatus, number>(
  "expense/fetchExpense",
  async (expenseId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${EXPENCES}/${expenseId}`);
      return response.data.data as ExpenseListStatus;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetch expense failed"
      );
    }
  }
);
