// F:\xintra_react_ts\src\slices\employee\primler\delete\reducer.tsx

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePrimler } from "./thunk";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

interface PrimlerDeleteInternalState {
  data: number | null;
  status: PrimlerListStatus;
  error: string | null;
}

const initialState: PrimlerDeleteInternalState = {
  data: null,
  status: PrimlerListStatus.IDLE,
  error: null,
};

const primlerDeleteSlice = createSlice({
  name: "primlerDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePrimler.pending, (state) => {
        state.status = PrimlerListStatus.LOADING;
        state.error = null;
      })
      .addCase(deletePrimler.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(deletePrimler.rejected, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default primlerDeleteSlice.reducer;
