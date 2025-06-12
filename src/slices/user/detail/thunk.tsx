import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USERS } from '../../../helpers/url_helper'
import { UserDetailState } from '../../../types/user/detail'

export const fetchUser = createAsyncThunk<UserDetailState, number>(
    'user/fetchUser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${USERS}/${userId}`)
            return response.data.data as UserDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch user failed')
        }
    }
)
