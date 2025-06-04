import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchStudentinfo } from "./thunk";
import { StudentinfoDetailState } from "../../../types/studentInfos/detail";
import StudentinfosListStatus from "../../../enums/studentInfos/list";

const initialState: StudentinfoDetailState = {
  data: null,
  status: StudentinfosListStatus.IDLE,
  error: null,
};

const studentinfoShowSlice = createSlice({
  name: "studentinfoShow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentinfo.pending, (state) => {
        state.status = StudentinfosListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchStudentinfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(
        fetchStudentinfo.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.FAILED;
          state.error = action.payload;
        }
      );
  },
});

export default studentinfoShowSlice.reducer;
