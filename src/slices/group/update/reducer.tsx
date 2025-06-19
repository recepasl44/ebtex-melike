import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GroupsUpdateState } from '../../../types/group/update'
import { updateGroup } from './thunk'
import GroupListStatus from '../../../enums/group/list'

const initialState: GroupsUpdateState = {
    data: null,
    status: GroupListStatus.IDLE,
    error: null,
}

const groupUpdateSlice = createSlice({
    name: 'groupUpdate',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateGroup.pending, (state) => {
                state.status = GroupListStatus.LOADING
                state.error = null
            })
            .addCase(updateGroup.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(updateGroup.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupUpdateSlice.reducer
