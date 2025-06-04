import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ENROLLMENTS } from '../../../helpers/url_helper'
import { EnrollmentAddPayload } from '../../../types/enrollments/add'
import { Enrollment } from '../../../types/enrollments/list'

export const addEnrollment = createAsyncThunk<Enrollment, EnrollmentAddPayload>(
  'enrollments/addEnrollment',
  async (payload, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.post(ENROLLMENTS, payload)
      return resp.data.data as Enrollment
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Add enrollment failed')
    }
  }
)
