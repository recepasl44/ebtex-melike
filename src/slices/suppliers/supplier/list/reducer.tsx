// F:\xintra_react_ts\src\slices\suppliers\list\reducer.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { fetchSupplierList } from "./thunk"
import {
  SuppliersListState,
  SuppliersListResponse,
} from "../../../../types/suppliers/supplier/list"
import SuppliersListStatus from "../../../../enums/suppliers/list"

const initialState: SuppliersListState = {
  data: null,
  current_page: 1,
  last_page: 1,
  total: 0,
  status: SuppliersListStatus.IDLE,
  error: null,
}

const suppliersListSlice = createSlice({
  name: "suppliersList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSupplierList.pending, (state) => {
        state.status = SuppliersListStatus.LOADING
        state.error = null
      })
      .addCase(
        fetchSupplierList.fulfilled,
        (state, action: PayloadAction<SuppliersListResponse>) => {
          state.status = SuppliersListStatus.SUCCEEDED
          state.data = action.payload.data
          state.current_page = action.payload.current_page
          state.last_page = action.payload.last_page
          state.total = action.payload.total
        }
      )
      .addCase(fetchSupplierList.rejected, (state, action: PayloadAction<any>) => {
        state.status = SuppliersListStatus.FAILED
        state.error = action.payload || "Fetch suppliers failed"
      })
  },
})

export default suppliersListSlice.reducer
