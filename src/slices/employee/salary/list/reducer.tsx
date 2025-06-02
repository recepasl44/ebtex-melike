import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SalaryListResponse,
  SalaryState,
} from "../../../../types/employee/salary/list";
import { fetchSalaryList } from "./thunk";
import { SalaryListStatus } from "../../../../enums/employee/salary/list";

const initialState: SalaryState = {
  data: [],
  status: SalaryListStatus.IDLE,
  error: null,
};

const salaryListSlice = createSlice({
  name: "salary/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalaryList.pending, (state) => {
        state.status = SalaryListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchSalaryList.fulfilled,
        (state, action: PayloadAction<SalaryListResponse>) => {
          state.status = SalaryListStatus.SUCCEEDED;
          state.data = action.payload.data; 
        }
      )
      .addCase(fetchSalaryList.rejected, (state, action: PayloadAction<any>) => {
        state.status = SalaryListStatus.FAILED;
        state.error = action.payload || "Fetch salary list failed";
      });
  },
});

export default salaryListSlice.reducer;
