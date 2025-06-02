import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { UsedAreasUpdatePayload } from '../../../types/usedareas/update'
import { UsedArea } from '../../../types/usedareas/list'
import { USEDAREAS } from '../../../helpers/url_helper'

export const updateUsedArea = createAsyncThunk<UsedArea, UsedAreasUpdatePayload>(
    'usedareas/updateUsedArea',
    async ({ usedAreaId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${USEDAREAS}/${usedAreaId}`, payload)
            return resp.data.data as UsedArea
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Update usedarea failed')
        }
    }
)
