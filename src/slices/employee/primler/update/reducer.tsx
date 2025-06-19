// F:\xintra_react_ts\src\slices\employee\primler\update\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatePrimler } from "./thunk";
import { PrimlerUpdateState } from "../../../../types/employee/primler/update";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

const initialState: PrimlerUpdateState = {
  data: null,
  status: PrimlerListStatus.IDLE,
  error: null,
};

const primlerUpdateSlice = createSlice({
  name: "primlerUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePrimler.pending, (state) => {
        state.status = PrimlerListStatus.LOADING;
        state.error = null;
      })
      .addCase(updatePrimler.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(updatePrimler.rejected, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default primlerUpdateSlice.reducer;
