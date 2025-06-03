
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient'; 
import { PROGRAMS } from '../../../helpers/url_helper';  
import { ProgramAddPayload } from '../../../types/programs/add';  
import { Program } from '../../../types/programs/list';  

export const addProgram = createAsyncThunk<Program, ProgramAddPayload>(
  'programs/addProgram',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(PROGRAMS, payload);
      return response.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add program failed');
    }
  }
);
