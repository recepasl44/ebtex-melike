import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DebitListResponse,
  DebitState,
} from "../../../../../types/employee/salary/debit/list";
import { fetchDebitList } from "./thunk";
import { DebitListStatus } from "../../../../../enums/employee/salary/debit/list";

const initialState: DebitState = {
  data: null,
  status: DebitListStatus.IDLE,
  error: null,
};

const debitListSlice = createSlice({
  name: "salary/debt/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDebitList.pending, (state) => {
        state.status = DebitListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchDebitList.fulfilled,
        (state, action: PayloadAction<DebitListResponse>) => {
          state.status = DebitListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchDebitList.rejected, (state, action: PayloadAction<any>) => {
        state.status = DebitListStatus.FAILED;
        state.error = action.payload || "Fetch salary/debt list failed";
      });
  },
});

export default debitListSlice.reducer;
