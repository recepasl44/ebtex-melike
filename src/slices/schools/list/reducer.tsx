import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SchoolListState,
  SchoolListResponse,
} from "../../../types/schools/list";
import { SchoolListStatus } from "../../../enums/schools/list";
import { fetchSchools } from "./thunk";

const initialState: SchoolListState = {
  data: null,
  meta: null,
  status: SchoolListStatus.IDLE,
  error: null,
};

const schoolListSlice = createSlice({
  name: "schoolList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.status = SchoolListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchSchools.fulfilled,
        (state, action: PayloadAction<SchoolListResponse>) => {
          state.status = SchoolListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.meta = action.payload.meta;
        }
      )
      .addCase(fetchSchools.rejected, (state, action: PayloadAction<any>) => {
        state.status = SchoolListStatus.FAILED;
        state.error = action.payload || "Fetch school list failed";
      });
  },
});

export default schoolListSlice.reducer;
