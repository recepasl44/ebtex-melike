import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTeachers } from './thunk';
import { ListTeacherResponse } from '../../../types/teachers/list';
import { TeachersListStatus } from '../../../enums/teachers/list';

export interface TeacherListState {
    data: ListTeacherResponse['data'] | null;
    links: ListTeacherResponse['links'] | null;
    meta: ListTeacherResponse['meta'] | null;
    status: TeachersListStatus;
    error: string | null;
}

const initialState: TeacherListState = {
    data: null,
    links: null,
    meta: null,
    status: TeachersListStatus.IDLE,
    error: null,
};

const teacherListSlice = createSlice({
    name: 'teachers/list',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.status = TeachersListStatus.LOADING;
                state.error = null;
            })
            .addCase(fetchTeachers.fulfilled, (state, action: PayloadAction<ListTeacherResponse>) => {
                state.status = TeachersListStatus.SUCCEEDED;
                state.data = action.payload.data;
                state.links = action.payload.links;
                state.meta = action.payload.meta;
            })
            .addCase(fetchTeachers.rejected, (state, action: PayloadAction<any>) => {
                state.status = TeachersListStatus.FAILED;
                state.error = action.payload || 'Fetch teachers failed';
            });
    },
});

export default teacherListSlice.reducer;
