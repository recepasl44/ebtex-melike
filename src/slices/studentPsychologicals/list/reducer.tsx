import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StudentPsychologicalListResponse } from "../../../types/studentPsychologicals/list";
import StudentPsychologicalsListStatus from "../../../enums/studentPsychologicals/list";
import { fetchStudentPsychologicals } from "./thunk";

interface StudentPsychologicalListState {
  data: StudentPsychologicalListResponse["data"] | null;
  links: StudentPsychologicalListResponse["links"] | null;
  meta: StudentPsychologicalListResponse["meta"] | null;
  status: StudentPsychologicalsListStatus;
  error: string | null;
}

const initialState: StudentPsychologicalListState = {
  data: null,
  links: null,
  meta: null,
  status: StudentPsychologicalsListStatus.IDLE,
  error: null,
};

const studentPsychologicalListSlice = createSlice({
  name: "studentpsychologicals/list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentPsychologicals.pending, (state) => {
        state.status = StudentPsychologicalsListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchStudentPsychologicals.fulfilled,
        (state, action: PayloadAction<StudentPsychologicalListResponse>) => {
          state.status = StudentPsychologicalsListStatus.SUCCEEDED;
          state.data = action.payload.data;
          state.links = action.payload.links;
          state.meta = action.payload.meta;
        }
      )
      .addCase(
        fetchStudentPsychologicals.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentPsychologicalsListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentPsychologicalListSlice.reducer;
