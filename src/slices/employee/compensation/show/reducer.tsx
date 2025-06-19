import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCompensationDetail } from "./thunk";
import { Compensation } from "../../../../types/employee/compensation/list";
import CompensationListStatus from "../../../../enums/employee/compensation/list";

interface CompensationShowState {
  data: Compensation | null;
  status: CompensationListStatus;
  error: string | null;
}

const initialState: CompensationShowState = {
  data: null,
  status: CompensationListStatus.IDLE,
  error: null,
};

const compensationShowSlice = createSlice({
  name: "compensation/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompensationDetail.pending, (state) => {
        state.status = CompensationListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCompensationDetail.fulfilled,
        (state, action: PayloadAction<Compensation>) => {
          state.status = CompensationListStatus.SUCCESS;
          state.data = action.payload;
        }
      )
      .addCase(fetchCompensationDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.ERROR;
        state.error = action.payload || "Fetch compensation detail failed";
      });
  },
});

export default compensationShowSlice.reducer;
