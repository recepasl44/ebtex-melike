import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deletePersonel } from "./thunk";
import { PersonelDeleteState } from "../../../../types/employee/personel/delete";
import { PersonelListStatus } from "../../../../enums/employee/personel/list";

const initialState: PersonelDeleteState = {
  data: null,
  status: PersonelListStatus.IDLE,
  error: null,
};

const personelDeleteSlice = createSlice({
  name: "personelDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletePersonel.pending, (state) => {
        state.status = PersonelListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deletePersonel.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = PersonelListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(deletePersonel.rejected, (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default personelDeleteSlice.reducer;
