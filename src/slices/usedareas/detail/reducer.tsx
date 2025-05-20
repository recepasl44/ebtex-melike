import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchUsedArea } from './thunk'
import { UsedAreasDetailState } from '../../../types/usedareas/detail'
import { UsedAreasListStatus } from '../../../enums/usedareas/list'

const initialState: UsedAreasDetailState = {
    data: null,
    status: UsedAreasListStatus.IDLE,
    error: null,
}

const usedAreasDetailSlice = createSlice({
    name: 'usedareas/detail',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsedArea.pending, state => {
                state.status = UsedAreasListStatus.LOADING
                state.error = null
            })
            .addCase(fetchUsedArea.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchUsedArea.rejected, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default usedAreasDetailSlice.reducer
