import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchClassrooms } from "./thunk";
import { ClassroomListState, ClassroomListStatus, ListClassroomResponse } from "../../../types/classrooms/list";

const initialState: ClassroomListState = {
  data: null,
  links: null,
  meta: null,
  status: ClassroomListStatus.IDLE,
  error: null,
};

const classroomListSlice = createSlice({
  name: "classrooms/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClassrooms.pending, (state) => {
      state.status = ClassroomListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchClassrooms.fulfilled, (state, action: PayloadAction<ListClassroomResponse>) => {
      state.status = ClassroomListStatus.SUCCEEDED;
      state.data = action.payload.data;
      state.links = action.payload.links;
      state.meta = action.payload.meta;
    });
    builder.addCase(fetchClassrooms.rejected, (state, action) => {
      state.status = ClassroomListStatus.FAILED;
      state.error = action.payload as string || "Fetch classrooms failed";
    });
  },
});

export default classroomListSlice.reducer;
