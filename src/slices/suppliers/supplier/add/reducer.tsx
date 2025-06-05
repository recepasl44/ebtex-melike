import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addSupplier } from "./thunk";
import { SupplierAddState } from "../../../../types/suppliers/supplier/add";
import SupplierListStatus from "../../../../enums/suppliers/list";

const initialState: SupplierAddState = {
  data: null,
  status: SupplierListStatus.IDLE,
  error: null,
};
const supplierAddSlice = createSlice({
  name: "supplierAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSupplier.pending, (state) => {
        state.status = SupplierListStatus.LOADING;
        state.error = null;
      })
      .addCase(addSupplier.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = SupplierListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addSupplier.rejected, (state, action: PayloadAction<any>) => {
        state.status = SupplierListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default supplierAddSlice.reducer;
