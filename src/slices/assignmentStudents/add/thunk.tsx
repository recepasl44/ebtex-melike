// src/slices/assignmentStudents/add/thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ASSIGNMENT_STUDENTS } from '../../../helpers/url_helper';
import {
    AssignmentStudentsAddPayload,
} from '../../../types/assignmentStudents/add';
import {
    AssignmentStudentData,
} from '../../../types/assignmentStudents/list';


export const addAssignmentStudent = createAsyncThunk<
    AssignmentStudentData,
    AssignmentStudentsAddPayload
>(
    'assignmentStudents/add',
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(ASSIGNMENT_STUDENTS, payload);

            return resp.data.data as AssignmentStudentData;

        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? 'addAssignmentStudent failed'
            );
        }
    }
);
