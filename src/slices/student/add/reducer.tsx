import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addStudent } from './thunk';
import { AddStudentState, AddStudentStatus } from '../../../types/student/add';

const initialState: AddStudentState = {
  data: null,
  status: AddStudentStatus.IDLE,
  error: null,
};

const studentAddSlice = createSlice({
  name: 'student/add',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addStudent.pending, (state) => {
      state.status = AddStudentStatus.LOADING;
      state.error = null;
    });
    builder.addCase(addStudent.fulfilled, (state, action: PayloadAction<{ data: any }>) => {
      state.status = AddStudentStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(addStudent.rejected, (state, action: PayloadAction<any>) => {
      state.status = AddStudentStatus.FAILED;
      state.error = action.payload || 'Add student failed';
    });
  },
});

export default studentAddSlice.reducer;
