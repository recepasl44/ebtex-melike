import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addStudentinfo } from "./thunk";
import { StudentinfosAddState } from "../../../types/studentInfos/add";
import StudentinfosListStatus from "../../../enums/studentInfos/list";

const initialState: StudentinfosAddState = {
  data: null,
  status: StudentinfosListStatus.IDLE,
  error: null,
};

const studentinfosAddSlice = createSlice({
  name: "studentinfosAdd",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStudentinfo.pending, (state) => {
        state.status = StudentinfosListStatus.LOADING;
        state.error = null;
      })
      .addCase(
        addStudentinfo.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.status = StudentinfosListStatus.SUCCEEDED;
          state.data = action.payload;
        }
      )
      .addCase(addStudentinfo.rejected, (state, action: PayloadAction<any>) => {
        state.status = StudentinfosListStatus.FAILED;
        state.error = action.payload;
      });
  },
});

export default studentinfosAddSlice.reducer;
