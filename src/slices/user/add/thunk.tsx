import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USERS } from '../../../helpers/url_helper'
import { UserData } from '../../../types/user/list'
import { UserAddPayload } from '../../../types/user/add'

export const addUser = createAsyncThunk<UserData, UserAddPayload>(
    'user/addUser',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(USERS, payload)
            return resp.data.data as UserData
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add user failed')
        }
    }
)
