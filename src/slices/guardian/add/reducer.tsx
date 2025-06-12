import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addGuardian } from "./thunk";
import { GuardiansAddState } from "../../../types/guardian/add";
import { GuardiansListStatus } from "../../../enums/guardian/list";

const initialState: GuardiansAddState = {
  data: null,
  status: GuardiansListStatus.IDLE,
  error: null,
};

const guardianAddSlice = createSlice({
  name: "guardianAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addGuardian.pending, (state) => {
        state.status = GuardiansListStatus.LOADING;
        state.error = null;
      })
      .addCase(addGuardian.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = GuardiansListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addGuardian.rejected, (state, action: PayloadAction<any>) => {
        state.status = GuardiansListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default guardianAddSlice.reducer;
