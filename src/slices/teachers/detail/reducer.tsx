import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTeacher } from './thunk';
import { TeacherShowState } from '../../../types/teachers/detail';
import { TeachersListStatus } from '../../../enums/teachers/list';

const initialState: TeacherShowState = {
    data: null,
    status: TeachersListStatus.IDLE,
    error: null,
};

const teacherShowSlice = createSlice({
    name: 'teacherShow',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeacher.pending, (state) => {
                state.status = TeachersListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchTeacher.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.SUCCEEDED;
                state.data = action.payload;
            })
            .addCase(fetchTeacher.rejected, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.FAILED;
                state.error = action.payload;
            });
    },
});

export default teacherShowSlice.reducer;
