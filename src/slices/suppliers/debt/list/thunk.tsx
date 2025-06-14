import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { DEBTS } from "../../../../helpers/url_helper";
import { ListDebtResponse } from "../../../../types/suppliers/debt/list";

interface DebtListArgs {
  searchTerm?: string;
  page?: number;
  paginate?: number;
}

export const fetchDebts = createAsyncThunk<ListDebtResponse, DebtListArgs>(
  "debts/fetchDebts",
  async ({ searchTerm = "", page = 1, paginate = 25 }, { rejectWithValue }) => {
    try {
      let url = `${DEBTS}?page=${page}&paginate=${paginate}`;
      if (searchTerm) {
        url += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const resp = await axiosInstance.get(url);
      return resp.data as ListDebtResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch debts failed"
      );
    }
  }
);
