import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRegisterNo } from './thunk';
import {
  IRegisterNo,
  RegisterNoState,
  RegisterNoStatus
} from '../../../types/registerNo/list';

const initialState: RegisterNoState = {
  data: null,
  status: RegisterNoStatus.IDLE,
  error: null,
};

const registerNoSlice = createSlice({
  name: 'finalRegister/fetchRegisterNo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegisterNo.pending, (state) => {
      state.status = RegisterNoStatus.LOADING;
      state.error = null;
    });
    builder.addCase(fetchRegisterNo.fulfilled, (state, action: PayloadAction<IRegisterNo>) => {
      state.status = RegisterNoStatus.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(fetchRegisterNo.rejected, (state, action: PayloadAction<any>) => {
      state.status = RegisterNoStatus.FAILED;
      state.error = action.payload || 'Fetch register no failed';
    });
  },
});

export default registerNoSlice.reducer;
