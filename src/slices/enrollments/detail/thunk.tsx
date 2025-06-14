import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ENROLLMENTS } from '../../../helpers/url_helper'
import { Enrollment } from '../../../types/enrollments/list'

export const fetchEnrollment = createAsyncThunk<Enrollment, number>(
  'enrollments/fetchEnrollment',
  async (enrollmentId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${ENROLLMENTS}/${enrollmentId}`)
      return resp.data.data as Enrollment
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch enrollment failed')
    }
  }
)
