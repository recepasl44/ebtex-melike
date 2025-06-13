import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USERS, DEACTIVATED_USERS, DELETED_USERS } from '../../../helpers/url_helper'
import { ListUsersResponse, UsersListArg } from '../../../types/user/list'

export const fetchUsers = createAsyncThunk<ListUsersResponse, UsersListArg>(
    'user/fetchUsers',
    async (queryParams, { rejectWithValue }) => {
        try {
            // Decide which endpoint to call based on a custom 'userType' param if provided,
            // otherwise default to the main /users endpoint
            const endpoint = queryParams.userType === 'deactivated'
                ? DEACTIVATED_USERS
                : queryParams.userType === 'deleted'
                    ? DELETED_USERS
                    : USERS

            const queryString = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled' && key !== 'userType') {
                    queryString.append(key, String(value))
                }
            })
            const url = `${endpoint}?${queryString.toString()}`
            const resp = await axiosInstance.get(url)
            return resp.data as ListUsersResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch users failed')
        }
    }
)
