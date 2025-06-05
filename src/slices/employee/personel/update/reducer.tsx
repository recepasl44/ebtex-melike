import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updatePersonel } from "./thunk";
import { PersonelUpdateState } from "../../../../types/employee/personel/update";
import { PersonelListStatus } from "../../../../enums/employee/personel/list";

const initialState: PersonelUpdateState = {
  data: null,
  status: PersonelListStatus.IDLE,
  error: null,
};

const personelUpdateSlice = createSlice({
  name: "personelUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePersonel.pending, (state) => {
        state.status = PersonelListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updatePersonel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = PersonelListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(updatePersonel.rejected, (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default personelUpdateSlice.reducer;
