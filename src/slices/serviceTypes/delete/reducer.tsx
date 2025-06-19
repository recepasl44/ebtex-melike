import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicetypesDeleteState } from "../../../types/serviceTypes/delete";
import { ServicetypesListStatus } from "../../../enums/serviceTypes/list";
import { deleteServicetype } from "./thunk";

const initialState: ServicetypesDeleteState = {
  data: null,
  status: ServicetypesListStatus.IDLE,
  error: null,
};

const servicetypesDeleteSlice = createSlice({
  name: "servicetypesDelete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteServicetype.pending, (state) => {
        state.status = ServicetypesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        deleteServicetype.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        deleteServicetype.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default servicetypesDeleteSlice.reducer;
