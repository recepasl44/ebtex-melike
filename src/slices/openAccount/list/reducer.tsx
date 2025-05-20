import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  OpenAccountListState,
  OpenAccountListResponse,
} from "../../../types/openAccount/list";
import { OpenAccountListStatus } from "../../../enums/openAccount/list";
import { fetchOpenAccountList } from "./thunk";

const initialState: OpenAccountListState = {
  data: null,
  status: OpenAccountListStatus.IDLE,
  error: null,
};

const openAccountListSlice = createSlice({
  name: "openAccountList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenAccountList.pending, (state) => {
        state.status = OpenAccountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchOpenAccountList.fulfilled,
        (state, action: PayloadAction<OpenAccountListResponse>) => {
          state.status = OpenAccountListStatus.SUCCEEDED;
          state.data = action.payload.data;
        }
      )
      .addCase(
        fetchOpenAccountList.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = OpenAccountListStatus.FAILED;
          state.error = action.payload || "Fetch open accounts failed";
        }
      );
  },
});

export default openAccountListSlice.reducer;
