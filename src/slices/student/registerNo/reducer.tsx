import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRegisterNo } from './thunk';
import { RegisterNoState, RegisterNoStatus } from '../../../types/student/registerNo';

const initialState: RegisterNoState = {
  data: null,
  status: RegisterNoStatus.IDLE,
  error: null,
};

const registerNoSlice = createSlice({
  name: 'student/registerNo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegisterNo.pending, (state) => {
      state.status = RegisterNoStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchRegisterNo.fulfilled, (state, action: PayloadAction<{ data: { register_no: string } }>) => {
      state.status = RegisterNoStatus.SUCCEEDED;
      state.data = { register_no: action.payload.data.register_no };
    });
    builder.addCase(fetchRegisterNo.rejected, (state, action: PayloadAction<any>) => {
      state.status = RegisterNoStatus.FAILED;
      state.error = action.payload || 'Fetch register no failed';
    });
  },
});

export default registerNoSlice.reducer;
