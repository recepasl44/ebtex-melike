import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteStudent } from './thunk';
import { DeleteStudentState, DeleteStudentStatus } from '../../../types/student/delete';

const initialState: DeleteStudentState = {
  data: null,
  status: DeleteStudentStatus.IDLE,
  error: null,
};

const studentDeleteSlice = createSlice({
  name: 'student/delete',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteStudent.pending, (state) => {
      state.status = DeleteStudentStatus.LOADING;
      state.error = null;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action: PayloadAction<{ data: { id: number } }>) => {
      state.status = DeleteStudentStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(deleteStudent.rejected, (state, action: PayloadAction<any>) => {
      state.status = DeleteStudentStatus.FAILED;
      state.error = action.payload || 'Delete student failed';
    });
  },
});

export default studentDeleteSlice.reducer;
