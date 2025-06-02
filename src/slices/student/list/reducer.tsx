import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStudents } from "./thunk";
import {
  ListStudentResponse,
  StudentListStatus,
} from "../../../types/student/list";

export interface StudentListState {
  data: ListStudentResponse["data"] | null;
  links: ListStudentResponse["links"] | null;
  meta: ListStudentResponse["meta"] | null;
  status: StudentListStatus;
  error: string | null;
}

const initialState: StudentListState = {
  data: null,
  links: null,
  meta: null,
  status: StudentListStatus.IDLE,
  error: null,
};

const studentListSlice = createSlice({
  name: "student/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = StudentListStatus.LOADING;
      state.error = null;
    });
    builder.addCase(
      fetchStudents.fulfilled,
      (state, action: PayloadAction<ListStudentResponse>) => {
        state.status = StudentListStatus.SUCCEEDED;
        state.data = action.payload.data;
        state.links = action.payload.links;
        state.meta = action.payload.meta;
      }
    );
    builder.addCase(
      fetchStudents.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = StudentListStatus.FAILED;
        state.error = action.payload || "Fetch students failed";
      }
    );
  },
});

export default studentListSlice.reducer;
