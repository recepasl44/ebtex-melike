import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUsedAreas } from './thunk'
import { UsedArea, UsedAreasListResponse } from '../../../types/usedareas/list'
import { UsedAreasListStatus } from '../../../enums/usedareas/list'

export interface UsedAreasListState {
    data: UsedArea[] | null
    links: UsedAreasListResponse['links'] | null
    meta: UsedAreasListResponse['meta'] | null
    status: UsedAreasListStatus
    error: string | null
}

const initialState: UsedAreasListState = {
    data: null,
    links: null,
    meta: null,
    status: UsedAreasListStatus.IDLE,
    error: null,
}

const usedAreasListSlice = createSlice({
    name: 'usedareas/list',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsedAreas.pending, state => {
                state.status = UsedAreasListStatus.LOADING
                state.error = null
            })
            .addCase(fetchUsedAreas.fulfilled, (state, action: PayloadAction<UsedAreasListResponse>) => {
                state.status = UsedAreasListStatus.SUCCEEDED
                state.data = action.payload.data
                state.links = action.payload.links
                state.meta = action.payload.meta
            })
            .addCase(fetchUsedAreas.rejected, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.FAILED
                state.error = action.payload || 'Fetch usedareas failed'
            })
    },
})

export default usedAreasListSlice.reducer
