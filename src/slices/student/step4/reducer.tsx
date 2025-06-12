import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { completeStudentContract } from './thunk';
import { StudentStep4State, StudentStep4Status } from '../../../types/student/step4';

const initialState: StudentStep4State = {
  data: null,
  status: StudentStep4Status.IDLE,
  error: null,
};

const studentStep4Slice = createSlice({
  name: 'student/step4',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(completeStudentContract.pending, (state) => {
      state.status = StudentStep4Status.LOADING;
      state.error = null;
    });
    builder.addCase(completeStudentContract.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = StudentStep4Status.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(completeStudentContract.rejected, (state, action: PayloadAction<any>) => {
      state.status = StudentStep4Status.FAILED;
      state.error = action.payload || 'Complete student contract failed';
    });
  },
});

export default studentStep4Slice.reducer;
