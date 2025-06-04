import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ServicetypesData,
  ServicetypesListResponse,
} from "../../../types/serviceTypes/list";
import { ServicetypesListStatus } from "../../../enums/serviceTypes/list";
import { fetchServicetypes } from "./thunk";

interface ServicetypesListState {
  data: ServicetypesData[] | null;
  links: ServicetypesListResponse["links"] | null;
  meta: ServicetypesListResponse["meta"] | null;
  status: ServicetypesListStatus;
  error: string | null;
}

const initialState: ServicetypesListState = {
  data: null,
  links: null,
  meta: null,
  status: ServicetypesListStatus.IDLE,
  error: null,
};

const servicetypesListSlice = createSlice({
  name: "servicetypes/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicetypes.pending, (state) => {
        state.status = ServicetypesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchServicetypes.fulfilled,
        (state, action: PayloadAction<ServicetypesListResponse>) => {
          state.status = ServicetypesListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchServicetypes.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = ServicetypesListStatus.FAILED;
          state.error = action.payload || "Fetch servicetypes failed";
        }
      );
  },
});

export default servicetypesListSlice.reducer;
