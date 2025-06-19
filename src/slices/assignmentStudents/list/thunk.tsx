import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ASSIGNMENT_STUDENTS } from '../../../helpers/url_helper';
import {
    AssignmentStudentsListArg,
    AssignmentStudentsListResponse,
} from '../../../types/assignmentStudents/list';


export const fetchAssignmentStudents = createAsyncThunk<
    AssignmentStudentsListResponse,
    AssignmentStudentsListArg
>(
    'assignmentStudents/fetch',
    async (params, { rejectWithValue }) => {
        try {
            const {
                enabled,
                pageSize,
                orderBy = 'ASC',
                sortBy = 'created_at',
                ...rest
            } = params;

            const resp = await axiosInstance.get(ASSIGNMENT_STUDENTS, {
                params: {
                    ...rest,
                    paginate: pageSize,
                    orderBy,
                    sortBy,
                },
            });

            return resp.data as AssignmentStudentsListResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? 'fetchAssignmentStudents failed'
            );
        }
    }
);
