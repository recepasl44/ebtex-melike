import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteGuardian } from "./thunk";
import { GuardiansDeleteState } from "../../../types/guardian/delete";
import { GuardiansListStatus } from "../../../enums/guardian/list";

const initialState: GuardiansDeleteState = {
  data: null,
  status: GuardiansListStatus.IDLE,
  error: null,
};

const guardiansDeleteSlice = createSlice({
  name: "guardiansDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteGuardian.pending, (state) => {
        state.status = GuardiansListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteGuardian.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuardiansListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(deleteGuardian.rejected, (state, action: PayloadAction<any>) => {
        state.status = GuardiansListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default guardiansDeleteSlice.reducer;
