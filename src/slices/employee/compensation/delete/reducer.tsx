import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteCompensation } from "./thunk";
import { CompensationDeleteState } from "../../../../types/employee/compensation/delete";
import CompensationListStatus from "../../../../enums/employee/compensation/list";

const initialState: CompensationDeleteState = {
  data: null,
  status: CompensationListStatus.IDLE,
  error: null,
};

const compensationDeleteSlice = createSlice({
  name: "compensationDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompensation.pending, (state) => {
        state.status = CompensationListStatus.LOADING;
        state.error = null;
      })
      .addCase(deleteCompensation.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deleteCompensation.rejected, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default compensationDeleteSlice.reducer;
