import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPersonel } from "./thunk";
import PersonelListStatus from "../../../../enums/employee/personel/list"; // Corrected import

import { PersonelListState } from "../../../../types/employee/personel/list";

const initialState: PersonelListState = {
  data: [],
  status: PersonelListStatus.IDLE,
  error: null,
};

const personnelListSlice = createSlice({
  name: "finalRegister/fetchPersonnel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPersonel.pending, (state) => {
      state.status = PersonelListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchPersonel.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.SUCCEEDED;
        state.data = action.payload;
      }
    );
    builder.addCase(
      fetchPersonel.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.FAILED;
        state.error = action.payload || "Fetch personnel failed";
      }
    );
  },
});

export default personnelListSlice.reducer;
