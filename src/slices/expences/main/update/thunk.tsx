import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCES } from "../../../../helpers/url_helper";
import { ExpenseUpdatePayload } from "../../../../types/expences/main/update";
import { IExpense } from "../../../../types/expences/main/list";

export const updateExpense = createAsyncThunk<IExpense, ExpenseUpdatePayload>(
  "expense/updateExpense",
  async ({ expenseId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(`${EXPENCES}/${expenseId}`, payload);
      return resp.data.data as IExpense;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update expense failed"
      );
    }
  }
);
