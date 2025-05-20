import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { STUDENTGROUPS } from '../../../helpers/url_helper'
import { Data } from '../../../types/studentGroup/list'
import { StudentGroupsAddPayload } from '../../../types/studentGroup/add'

export const addStudentGroup = createAsyncThunk<Data, StudentGroupsAddPayload>(
    'studentGroup/addStudentGroup',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(STUDENTGROUPS, payload)
            return resp.data.data as Data
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add student group failed')
        }
    }
)
