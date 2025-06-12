import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addGroupType } from './thunk'
import { GroupTypesAddState } from '../../../types/grouptype/add'
import GroupTypeListStatus from '../../../enums/grouptype/list'

const initialState: GroupTypesAddState = {
    data: null,
    status: GroupTypeListStatus.IDLE,
    error: null,
}

const groupTypeAddSlice = createSlice({
    name: 'grouptypeAdd',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addGroupType.pending, (state) => {
                state.status = GroupTypeListStatus.LOADING
                state.error = null
            })
            .addCase(addGroupType.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.SUCCEEDED
                state.data = action.payload
            })
            .addCase(addGroupType.rejected, (state, action: PayloadAction<any>) => {
                state.status = GroupTypeListStatus.FAILED
                state.error = action.payload
            })
    },
})

export default groupTypeAddSlice.reducer
