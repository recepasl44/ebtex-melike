import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StudentinfosListStatus from "../../../enums/studentInfos/list";
import { StudentinfosListResponse } from "../../../types/studentInfos/list";
import { fetchStudentinfos } from "./thunk";

export interface StudentinfosListState {
  data: StudentinfosListResponse["data"] | null;
  links: StudentinfosListResponse["links"] | null;
  meta: StudentinfosListResponse["meta"] | null;
  status: StudentinfosListStatus;
  error: string | null;
}

const initialState: StudentinfosListState = {
  data: null,
  links: null,
  meta: null,
  status: StudentinfosListStatus.IDLE,
  error: null,
};

const studentinfosListSlice = createSlice({
  name: "studentinfos/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentinfos.pending, (state) => {
        state.status = StudentinfosListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchStudentinfos.fulfilled,
        (state, action: PayloadAction<StudentinfosListResponse>) => {
          state.status = StudentinfosListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchStudentinfos.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.FAILED;
          state.error = action.payload || "Fetch studentinfos failed";
        }
      );
  },
});

export default studentinfosListSlice.reducer;
