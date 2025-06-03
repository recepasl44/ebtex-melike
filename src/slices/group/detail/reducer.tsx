import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchGroup } from './thunk'
import { GroupDetailState } from '../../../types/group/detail'
import GroupListStatus from '../../../enums/group/list'

const initialState: GroupDetailState = {
    data: null,
    status: GroupListStatus.IDLE,
    error: null,
}

const groupDetailSlice = createSlice({
    name: 'groupDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGroup.pending, (state) => {
                state.status = GroupListStatus.LOADING
                state.error = null
            })
            .addCase(fetchGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(fetchGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupDetailSlice.reducer
