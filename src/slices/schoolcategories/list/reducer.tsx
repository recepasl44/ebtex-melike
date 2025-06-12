import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SchoolCategoryData,
  SchoolCategoriesListResponse,
} from "../../../types/schoolcategories/list";
import SchoolCategoriesListStatus from "../../../enums/schoolcategories/list";
import { fetchSchoolCategories } from "./thunk";

export interface SchoolCategoriesListState {
  data: SchoolCategoryData[] | null;
  links: SchoolCategoriesListResponse["links"] | null;
  meta: SchoolCategoriesListResponse["meta"] | null;
  status: SchoolCategoriesListStatus;
  error: string | null;
}

const initialState: SchoolCategoriesListState = {
  data: null,
  links: null,
  meta: null,
  status: SchoolCategoriesListStatus.IDLE,
  error: null,
};

const schoolCategoriesListSlice = createSlice({
  name: "schoolcategories/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolCategories.pending, (state) => {
        state.status = SchoolCategoriesListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchSchoolCategories.fulfilled,
        (state, action: PayloadAction<SchoolCategoriesListResponse>) => {
          state.status = SchoolCategoriesListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchSchoolCategories.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = SchoolCategoriesListStatus.FAILED;
          state.error = action.payload || "Fetch school categories failed";
        }
      );
  },
});

export default schoolCategoriesListSlice.reducer;
