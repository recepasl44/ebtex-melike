import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteOpenAccount } from "./thunk";
import { IOpenAccountDeleteState } from "../../../types/openAccount/delete";
import { OpenAccountListStatus } from "../../../enums/openAccount/list";

const initialState: IOpenAccountDeleteState = {
  data: null,
  status: OpenAccountListStatus.IDLE,
  error: null,
};

const openAccountDeleteSlice = createSlice({
  name: "openAccountDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteOpenAccount.pending, (state) => {
        state.status = OpenAccountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteOpenAccount.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.status = OpenAccountListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteOpenAccount.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = OpenAccountListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default openAccountDeleteSlice.reducer;
