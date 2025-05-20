import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../../services/axiosClient'
import { USEDAREAS } from '../../../helpers/url_helper'
import { UsedAreasDeleteState } from '../../../types/usedareas/delete'

export const deleteUsedArea = createAsyncThunk<UsedAreasDeleteState, number>(
    'usedareas/deleteUsedArea',
    async (usedAreaId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${USEDAREAS}/${usedAreaId}`)
            return resp.data as UsedAreasDeleteState
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Delete usedarea failed')
        }
    }
)
