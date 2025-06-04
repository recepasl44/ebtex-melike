import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateGuardian } from "./thunk";
import { GuardiansUpdateState } from "../../../types/guardian/update";
import { GuardiansListStatus } from "../../../enums/guardian/list";

const initialState: GuardiansUpdateState = {
  data: null,
  status: GuardiansListStatus.IDLE,
  error: null,
};

const guardiansUpdateSlice = createSlice({
  name: "guardiansUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateGuardian.pending, (state) => {
        state.status = GuardiansListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateGuardian.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = GuardiansListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(updateGuardian.rejected, (state, action: PayloadAction<any>) => {
        state.status = GuardiansListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default guardiansUpdateSlice.reducer;
