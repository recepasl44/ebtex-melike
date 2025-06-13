import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { UserData } from '../../../types/user/list'
import { UserUpdatePayload } from '../../../types/user/update'
import { USERS } from '../../../helpers/url_helper'

export const updateUser = createAsyncThunk<UserData, UserUpdatePayload>(
    'user/updateUser',
    async ({ userId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${USERS}/${userId}`, payload)
            return resp.data.data as UserData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update user failed')
        }
    }
)
