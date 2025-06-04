import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicetypesDetailState } from "../../../types/serviceTypes/show";
import { ServicetypesListStatus } from "../../../enums/serviceTypes/list";
import { fetchServicetype } from "./thunk";

const initialState: ServicetypesDetailState = {
  data: null,
  status: ServicetypesListStatus.IDLE,
  error: null,
};

const servicetypesDetailSlice = createSlice({
  name: "servicetypesDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicetype.pending, (state) => {
        state.status = ServicetypesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchServicetype.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchServicetype.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default servicetypesDetailSlice.reducer;
