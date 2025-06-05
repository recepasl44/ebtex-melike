import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPrimler } from "./thunk";
import { PrimlerAddState } from "../../../../types/employee/primler/add";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

const initialState: PrimlerAddState = {
  data: null,
  status: PrimlerListStatus.IDLE,
  error: null,
};

const primlerAddSlice = createSlice({
  name: "primlerAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPrimler.pending, (state) => {
        state.status = PrimlerListStatus.LOADING;
        state.error = null;
      })
      .addCase(addPrimler.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.SUCCESS;
        state.data = action.payload;
      })
      .addCase(addPrimler.rejected, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default primlerAddSlice.reducer;
