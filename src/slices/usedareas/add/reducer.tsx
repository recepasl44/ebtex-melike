import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UsedAreasAddState } from '../../../types/usedareas/add'
import { UsedAreasListStatus } from '../../../enums/usedareas/list'
import { addUsedArea } from './thunk'

const initialState: UsedAreasAddState = {
    data: null,
    status: UsedAreasListStatus.IDLE,
    error: null,
}

const usedAreasAddSlice = createSlice({
    name: 'usedareas/add',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(addUsedArea.pending, state => {
                state.status = UsedAreasListStatus.LOADING
                state.error = null
            })
            .addCase(addUsedArea.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addUsedArea.rejected, (state, action: PayloadAction<any>) => {
                state.status = UsedAreasListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default usedAreasAddSlice.reducer
