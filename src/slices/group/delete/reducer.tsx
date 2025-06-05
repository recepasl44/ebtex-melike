import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deleteGroup } from './thunk'
import { GroupsDeleteState } from '../../../types/group/delete'
import GroupListStatus from '../../../enums/group/list'

const initialState: GroupsDeleteState = {
    data: null,
    status: GroupListStatus.IDLE,
    error: null,
}

const groupDeleteSlice = createSlice({
    name: 'groupDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteGroup.pending, (state) => {
                state.status = GroupListStatus.LOADING
                state.error = null
            })
            .addCase(deleteGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(deleteGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupDeleteSlice.reducer
