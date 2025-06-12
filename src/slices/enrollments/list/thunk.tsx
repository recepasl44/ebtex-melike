import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { ENROLLMENTS } from '../../../helpers/url_helper'
import { EnrollmentsListArg, EnrollmentsListResponse } from '../../../types/enrollments/list'

export const fetchEnrollments = createAsyncThunk<EnrollmentsListResponse, EnrollmentsListArg>(
  'enrollments/fetchEnrollments',
  async (queryParams, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams()
      Object.entries(queryParams).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'enabled') {
          query.append(key, String(value))
        }
      })
      const queryString = query.toString()
      const url = `${ENROLLMENTS}?${queryString}`
      const resp = await axiosInstance.get(url)
      return resp.data as EnrollmentsListResponse
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Fetch enrollments failed')
    }
  }
)
