import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsedAreasDeleteState } from '../../../types/usedareas/delete'
import { UsedAreasListStatus } from '../../../enums/usedareas/list'
import { deleteUsedArea } from './thunk'

const initialState: UsedAreasDeleteState = {
    data: null,
    status: UsedAreasListStatus.IDLE,
    error: null,
}

const usedAreasDeleteSlice = createSlice({
    name: 'usedareas/delete',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(deleteUsedArea.pending, state => {
                state.status = UsedAreasListStatus.LOADING
                state.error = null
            })
            .addCase(deleteUsedArea.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteUsedArea.rejected, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default usedAreasDeleteSlice.reducer
