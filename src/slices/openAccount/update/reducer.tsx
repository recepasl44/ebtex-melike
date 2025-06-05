import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateOpenAccount } from "./thunk";
import { OpenAccountUpdateState } from "../../../types/openAccount/update";
import { OpenAccountListStatus } from "../../../enums/openAccount/list";

const initialState: OpenAccountUpdateState = {
  data: null,
  status: OpenAccountListStatus.IDLE,
  error: null,
};

const openAccountUpdateSlice = createSlice({
  name: "openAccountUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateOpenAccount.pending, (state) => {
        state.status = OpenAccountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateOpenAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = OpenAccountListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateOpenAccount.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = OpenAccountListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default openAccountUpdateSlice.reducer;
