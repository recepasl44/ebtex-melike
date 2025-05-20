import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USEDAREAS } from '../../../helpers/url_helper'
import { UsedAreasDetailState } from '../../../types/usedareas/detail'

export const fetchUsedArea = createAsyncThunk<UsedAreasDetailState, number>(
    'usedareas/fetchUsedArea',
    async (usedAreaId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${USEDAREAS}/${usedAreaId}`)
            return response.data.data as UsedAreasDetailState
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Fetch usedarea failed')
        }
    }
)
