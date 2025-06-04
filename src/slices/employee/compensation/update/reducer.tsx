import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCompensation } from "./thunk";
import { CompensationUpdateState } from "../../../../types/employee/compensation/update";
import CompensationListStatus from "../../../../enums/employee/compensation/list";

const initialState: CompensationUpdateState = {
  data: null,
  status: CompensationListStatus.IDLE,
  error: null,
};

const compensationUpdateSlice = createSlice({
  name: "compensationUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateCompensation.pending, (state) => {
        state.status = CompensationListStatus.LOADING;
        state.error = null;
      })
      .addCase(updateCompensation.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updateCompensation.rejected, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default compensationUpdateSlice.reducer;
