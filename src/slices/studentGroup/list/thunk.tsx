import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { STUDENTGROUPS } from '../../../helpers/url_helper'
import { ListStudentGroupsResponse, StudentGroupsListArg } from '../../../types/studentGroup/list'

export const fetchStudentGroups = createAsyncThunk<ListStudentGroupsResponse, StudentGroupsListArg>(
    'studentGroup/fetchStudentGroups',
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    queryString.append(key, String(value))
                }
            })
            const url = `${STUDENTGROUPS}?${queryString.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListStudentGroupsResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch student groups failed')
        }
    }
)
