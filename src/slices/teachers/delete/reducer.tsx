import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteTeacher } from './thunk';
import { TeachersDeleteState } from '../../../types/teachers/delete';
import { TeachersListStatus } from '../../../enums/teachers/list';

const initialState: TeachersDeleteState = {
    data: null,
    status: TeachersListStatus.IDLE,
    error: null,
};

const teachersDeleteSlice = createSlice({
    name: 'teachersDelete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteTeacher.pending, (state) => {
                state.status = TeachersListStatus.LOADING;
                state.error = null;
            })
            .addCase(deleteTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(deleteTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default teachersDeleteSlice.reducer;
