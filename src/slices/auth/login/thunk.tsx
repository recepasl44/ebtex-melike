
import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

import axiosInstance from '../../../services/axiosClient';
import {
  LoginPayload,
  LoginResponse,
  ErrorLoginResponse,
} from '../../../types/auth/login/login';
import {LOGIN_USER} from '../../../helpers/url_helper';
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
 
      const response = await axiosInstance.post<LoginResponse>(
        LOGIN_USER,
        payload
      );

 
      if ('error' in response.data) {
        const errorData = response.data as ErrorLoginResponse;
        return rejectWithValue(errorData.error.message);
      }

      const { token, ...otherData } = response.data;

      if (token) {
        Cookies.set('token', token);
      }

      localStorage.setItem('userData', JSON.stringify(otherData));


      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
