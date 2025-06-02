import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { EXPENCES } from "../../../../helpers/url_helper";
import { ExpenseAddPayload } from "../../../../types/expences/main/add";
import { IExpense } from "../../../../types/expences/main/list";

export const addExpense = createAsyncThunk<IExpense, ExpenseAddPayload>(
  "expense/addExpense",
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(EXPENCES, payload);
      return resp.data.data as IExpense;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Add expense failed"
      );
    }
  }
);
