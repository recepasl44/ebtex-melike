import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USERS } from '../../../helpers/url_helper'
import { UserDeleteState } from '../../../types/user/delete'

export const deleteUser = createAsyncThunk<UserDeleteState, number>(
    'user/deleteUser',
    async (userId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${USERS}/${userId}`)
            return resp.data as UserDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete user failed')
        }
    }
)
