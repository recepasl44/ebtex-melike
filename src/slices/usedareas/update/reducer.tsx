import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsedAreasUpdateState } from '../../../types/usedareas/update'
import { UsedAreasListStatus } from '../../../enums/usedareas/list'
import { updateUsedArea } from './thunk'

const initialState: UsedAreasUpdateState = {
    data: null,
    status: UsedAreasListStatus.IDLE,
    error: null,
}

const usedAreasUpdateSlice = createSlice({
    name: 'usedAreasUpdate',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(updateUsedArea.pending, state => {
                state.status = UsedAreasListStatus.LOADING
                state.error = null
            })
            .addCase(updateUsedArea.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateUsedArea.rejected, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default usedAreasUpdateSlice.reducer
