import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchClassrooms } from "./thunk";
import { IClassroom, ClassroomListState, ClassroomListStatus } from "../../../types/classrooms/list";

const initialState: ClassroomListState = {
  data: [],
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
    builder.addCase(fetchClassrooms.fulfilled, (state, action: PayloadAction<IClassroom[]>) => {
      state.status = ClassroomListStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchClassrooms.rejected, (state, action) => {
      state.status = ClassroomListStatus.FAILED;
      state.error = action.payload as string || "Fetch classrooms failed";
    });
  },
});

export default classroomListSlice.reducer;
