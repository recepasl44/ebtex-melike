import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteSupplier } from "./thunk";
import { SupplierDeleteState } from "../../../../types/suppliers/supplier/delete";
import SupplierListStatus from "../../../../enums/suppliers/list";

const initialState: SupplierDeleteState = {
  data: null,
  status: SupplierListStatus.IDLE,
  error: null,
};

const supplierDeleteSlice = createSlice({
  name: "supplierDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteSupplier.pending, (state) => {
        state.status = SupplierListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteSupplier.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = SupplierListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(deleteSupplier.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierListStatus.FAILED;
        state.error = action.payload;
      });
  },
});
export default supplierDeleteSlice.reducer;
