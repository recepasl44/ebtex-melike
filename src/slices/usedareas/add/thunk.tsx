import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USEDAREAS } from '../../../helpers/url_helper'
import { UsedAreasAddPayload } from '../../../types/usedareas/add'
import { UsedArea } from '../../../types/usedareas/list'

export const addUsedArea = createAsyncThunk<UsedArea, UsedAreasAddPayload>(
    'usedareas/addUsedArea',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(USEDAREAS, payload)
            return resp.data.data as UsedArea
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Add usedarea failed')
        }
    }
)
