
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './thunk';
import {
  SuccessLoginResponse,
  LoginState,
} from '../../../types/auth/login/login';
import { LoginStatus } from '../../../enums/auth/login/login';

const initialState: LoginState = {
  isLoggedIn: false,
  error: null,
  status: LoginStatus.NOT_LOGGED_IN,
  token: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.error = null;
      state.status = LoginStatus.NOT_LOGGED_IN;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addCase(loginUser.pending, (state) => {
        state.status = LoginStatus.LOGGING_IN;
        state.isLoggedIn = false;
        state.error = null;
      })
      // Fulfilled -> SuccessLoginResponse
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<SuccessLoginResponse>) => {
        state.status = LoginStatus.LOGGED_IN;
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.error = null;
      })
      // Rejected -> error
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = LoginStatus.LOGIN_FAILED;
        state.isLoggedIn = false;
        state.error = action.payload || 'Login failed.';
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
