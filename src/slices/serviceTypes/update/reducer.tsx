import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateServicetype } from "./thunk";
import { ServicetypesUpdateState } from "../../../types/serviceTypes/update";
import { ServicetypesListStatus } from "../../../enums/serviceTypes/list";

const initialState: ServicetypesUpdateState = {
  data: null,
  status: ServicetypesListStatus.IDLE,
  error: null,
};

const servicetypesUpdateSlice = createSlice({
  name: "servicetypesUpdate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateServicetype.pending, (state) => {
        state.status = ServicetypesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        updateServicetype.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        updateServicetype.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default servicetypesUpdateSlice.reducer;
