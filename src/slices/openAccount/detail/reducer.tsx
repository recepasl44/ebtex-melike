import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchOpenAccount } from "./thunk";
import { OpenAccountShowState } from "../../../types/openAccount/show";
import { OpenAccountListStatus } from "../../../enums/openAccount/list";

const initialState: OpenAccountShowState = {
  data: null,
  status: OpenAccountListStatus.IDLE,
  error: null,
};
const openAccountShowSlice = createSlice({
  name: "openAccountShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpenAccount.pending, (state) => {
        state.status = OpenAccountListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchOpenAccount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = OpenAccountListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchOpenAccount.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = OpenAccountListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default openAccountShowSlice.reducer;
