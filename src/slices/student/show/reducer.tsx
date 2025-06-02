import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { showStudent } from './thunk';
import { ShowStudentState, StudentStatus} from '../../../types/student/show';
import { IStudent } from '../../../types/student/list';
const initialState: ShowStudentState = {
  data: null,
  status: StudentStatus.IDLE,
  error: null,
};

const studentShowSlice = createSlice({
  name: 'student/show',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(showStudent.pending, (state) => {
      state.status = StudentStatus.LOADING;
      state.error = null;
    });
    builder.addCase(showStudent.fulfilled, (state, action: PayloadAction<{ data: IStudent }>) => {
      state.status = StudentStatus.SUCCEEDED;
      state.data = action.payload.data;
    });
    builder.addCase(showStudent.rejected, (state, action: PayloadAction<any>) => {
      state.status = StudentStatus.FAILED;
      state.error = action.payload || 'Show student failed';
    });
  },
});

export default studentShowSlice.reducer;
