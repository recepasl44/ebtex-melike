import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addOpenAccount } from "./thunk";
import { OpenAccountAddState } from "../../../types/openAccount/add";
import { OpenAccountListStatus } from "../../../enums/openAccount/list";

const initialState: OpenAccountAddState = {
  data: null,
  status: OpenAccountListStatus.IDLE,
  error: null,
};

const openAccountAddSlice = createSlice({
  name: "openAccountAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addOpenAccount.pending, (state) => {
        state.status = OpenAccountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addOpenAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = OpenAccountListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(addOpenAccount.rejected, (state, action: PayloadAction<any>) => {
        state.status = OpenAccountListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default openAccountAddSlice.reducer;
