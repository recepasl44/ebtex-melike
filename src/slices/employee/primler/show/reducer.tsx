import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPrimlerDetail } from "./thunk";
import { Primler } from "../../../../types/employee/primler/list";
import PrimlerListStatus from "../../../../enums/employee/primler/list";

interface PrimlerShowState {
  data: Primler | null;
  status: PrimlerListStatus;
  error: string | null;
}

const initialState: PrimlerShowState = {
  data: null,
  status: PrimlerListStatus.IDLE,
  error: null,
};

const primlerShowSlice = createSlice({
  name: "primler/show",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrimlerDetail.pending, (state) => {
        state.status = PrimlerListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchPrimlerDetail.fulfilled,
        (state, action: PayloadAction<Primler>) => {
          state.status = PrimlerListStatus.SUCCESS;
          state.data = action.payload;
        }
      )
      .addCase(fetchPrimlerDetail.rejected, (state, action: PayloadAction<any>) => {
        state.status = PrimlerListStatus.ERROR;
        state.error = action.payload;
      });
  },
});

export default primlerShowSlice.reducer;
