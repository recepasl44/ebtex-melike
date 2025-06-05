import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateStudent } from './thunk';
import { UpdateStudentState, UpdateStudentStatus } from '../../../types/student/update';

const initialState: UpdateStudentState = {
  data: null,
  status: UpdateStudentStatus.IDLE,
  error: null,
};

const studentUpdateSlice = createSlice({
  name: 'student/update',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateStudent.pending, (state) => {
      state.status = UpdateStudentStatus.LOADING;
      state.error = null;
    });
    builder.addCase(updateStudent.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = UpdateStudentStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(updateStudent.rejected, (state, action: PayloadAction<any>) => {
      state.status = UpdateStudentStatus.FAILED;
      state.error = action.payload || 'Update student failed';
    });
  },
});

export default studentUpdateSlice.reducer;
