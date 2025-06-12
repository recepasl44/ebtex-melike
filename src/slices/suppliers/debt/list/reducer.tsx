import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDebts } from "./thunk";
import { ListDebtResponse } from "../../../../types/suppliers/debt/list";
import { DebtListStatus } from "../../../../enums/debts/list";

export interface DebtListState {
  data: ListDebtResponse["data"] | null;
  links: ListDebtResponse["first_page_url"] | null;
  meta: ListDebtResponse["meta"] | null;
  status: DebtListStatus;
  error: string | null;
}

const initialState: DebtListState = {
  data: null,
  links: null,
  meta: null,
  status: DebtListStatus.IDLE,
  error: null,
};

const debtListSlice = createSlice({
  name: "debts/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDebts.pending, (state) => {
      state.status = DebtListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchDebts.fulfilled,
      (state, action: PayloadAction<ListDebtResponse>) => {
        state.status = DebtListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.first_page_url;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(
      fetchDebts.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = DebtListStatus.FAILED;
        state.error = action.payload || "Fetch debts failed";
      }
    );
  },
});

export default debtListSlice.reducer;
