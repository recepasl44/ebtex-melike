import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicetypesAddState } from "../../../types/serviceTypes/add";
import { ServicetypesListStatus } from "../../../enums/serviceTypes/list";
import { addServicetype } from "./thunk";

const initialState: ServicetypesAddState = {
  data: null,
  status: ServicetypesListStatus.IDLE,
  error: null,
};

const servicetypesAddSlice = createSlice({
  name: "servicetypesAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addServicetype.pending, (state) => {
        state.status = ServicetypesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addServicetype.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(addServicetype.rejected, (state, action: PayloadAction<any>) => {
        state.status = ServicetypesListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default servicetypesAddSlice.reducer;
