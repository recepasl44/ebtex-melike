import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPrimlerList } from "./thunk";
import {
  PrimlerListResponse,
  PrimlerState,
} from "../../../../types/employee/primler/list";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

const initialState: PrimlerState = {
  data: [],
  status: PrimlerListStatus.IDLE,
  error: null,
};

const primlerListSlice = createSlice({
  name: "primler/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrimlerList.pending, (state) => {
        state.status = PrimlerListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchPrimlerList.fulfilled,
        (state, action: PayloadAction<PrimlerListResponse>) => {
          state.status = PrimlerListStatus.SUCCESS;
          state.data = action.payload.data;
        }
      )
      .addCase(fetchPrimlerList.rejected, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.ERROR;
        state.error = action.payload || "Fetch primler list failed";
      });
  },
});

export default primlerListSlice.reducer;
