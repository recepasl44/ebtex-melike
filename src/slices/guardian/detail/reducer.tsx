import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGuardian } from "./thunk";
import { GuardianDetailState } from "../../../types/guardian/detail";
import { GuardiansListStatus } from "../../../enums/guardian/list";

const initialState: GuardianDetailState = {
  data: null,
  status: GuardiansListStatus.IDLE,
  error: null,
};

const guardianShowSlice = createSlice({
  name: "guardianShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuardian.pending, (state) => {
        state.status = GuardiansListStatus.LOADING;
        state.error = null;
      })
      .addCase(fetchGuardian.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = GuardiansListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(fetchGuardian.rejected, (state, action: PayloadAction<any>) => {
        state.status = GuardiansListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default guardianShowSlice.reducer;
