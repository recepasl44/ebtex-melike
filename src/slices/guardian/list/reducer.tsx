import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchGuardians } from "./thunk";
import { GuardianListResponse } from "../../../types/guardian/list";
import { GuardiansListStatus } from "../../../enums/guardian/list";

export interface GuardianListState {
  data: GuardianListResponse["data"] | null;
  links: GuardianListResponse["links"] | null;
  meta: GuardianListResponse["meta"] | null;
  status: GuardiansListStatus;
  error: string | null;
}

const initialState: GuardianListState = {
  data: null,
  links: null,
  meta: null,
  status: GuardiansListStatus.IDLE,
  error: null,
};

const guardianListSlice = createSlice({
  name: "guardians/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGuardians.pending, (state) => {
      state.status = GuardiansListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchGuardians.fulfilled,
      (state, action: PayloadAction<GuardianListResponse>) => {
        state.status = GuardiansListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(
      fetchGuardians.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = GuardiansListStatus.FAILED;
        state.error = action.payload || "Fetch guardians failed";
      }
    );
  },
});

export default guardianListSlice.reducer;
