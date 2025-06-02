import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USEDAREAS } from '../../../helpers/url_helper'
import { UsedAreasListResponse, UsedAreasListArg } from '../../../types/usedareas/list'

export const fetchUsedAreas = createAsyncThunk<UsedAreasListResponse, UsedAreasListArg>(
    'usedareas/fetchUsedAreas',
    async (queryParams, { rejectWithValue }) => {
        try {
            const query = new URLSearchParams()
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null && key !== 'enabled') {
                    query.append(key, String(value))
                }
            })
            const queryString = query.toString()
            const url = `${USEDAREAS}?${queryString}`
            const resp = await axiosInstance.get(url)
            return resp.data as UsedAreasListResponse
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Fetch usedareas failed')
        }
    }
)
