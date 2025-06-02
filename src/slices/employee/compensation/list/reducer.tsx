import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCompensationList } from "./thunk";
import {
  CompensationListResponse,
  CompensationState,
} from "../../../../types/employee/compensation/list";
import CompensationListStatus from "../../../../enums/employee/compensation/list";

const initialState: CompensationState = {
  data: [],
  status: CompensationListStatus.IDLE,
  error: null,
};

const compensationListSlice = createSlice({
  name: "compensation/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompensationList.pending, (state) => {
        state.status = CompensationListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCompensationList.fulfilled,
        (state, action: PayloadAction<CompensationListResponse>) => {
          state.status = CompensationListStatus.SUCCESS;
          state.data = action.payload.data; // Compensation[]
        }
      )
      .addCase(fetchCompensationList.rejected, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.ERROR;
        state.error = action.payload || "Fetch compensation list failed";
      });
  },
});

export default compensationListSlice.reducer;
