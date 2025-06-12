import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSupplierShow } from "./thunk";
import { SupplierShowState } from "../../../../types/suppliers/supplier/show";
import SupplierListStatus from "../../../../enums/suppliers/list";

const initialState: SupplierShowState = {
  data: null,
  status: SupplierListStatus.IDLE,
  error: null,
};

const supplierShowSlice = createSlice({
  name: "supplierShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierShow.pending, (state) => {
        state.status = SupplierListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchSupplierShow.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = SupplierListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchSupplierShow.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = SupplierListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default supplierShowSlice.reducer;
