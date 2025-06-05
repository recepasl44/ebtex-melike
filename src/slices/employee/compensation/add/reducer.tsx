import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addCompensation } from "./thunk";
import { compensationAddState } from "../../../../types/employee/compensation/add";
import CompensationListStatus from "../../../../enums/employee/compensation/list";

const initialState: compensationAddState = {
  data: null,
  status: CompensationListStatus.IDLE,
  error: null,
};

const compensationAddSlice = createSlice({
  name: "compensationAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCompensation.pending, (state) => {
        state.status = CompensationListStatus.LOADING;
        state.error = null;
      })
      .addCase(addCompensation.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addCompensation.rejected, (state, action: PayloadAction<any>) => {
        state.status = CompensationListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default compensationAddSlice.reducer;
