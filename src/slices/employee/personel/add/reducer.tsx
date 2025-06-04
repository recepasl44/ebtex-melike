import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addPersonel } from "./thunk";
import { PersonelAddState } from "../../../../types/employee/personel/add";
import { PersonelListStatus } from "../../../../enums/employee/personel/list";

const initialState: PersonelAddState = {
  data: null,
  status: PersonelListStatus.IDLE,
  error: null,
};

const personelAddSlice = createSlice({
  name: "personelAdd",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPersonel.pending, (state) => {
        state.status = PersonelListStatus.LOADING;
        state.error = null;
      })
      .addCase(addPersonel.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.SUCCEEDED;
        state.data = action.payload;
      })
      .addCase(addPersonel.rejected, (state, action: PayloadAction<any>) => {
        state.status = PersonelListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default personelAddSlice.reducer;
