import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ASSIGNMENT_STUDENTS } from '../../../helpers/url_helper';
import {
    AssignmentStudentsUpdatePayload,
} from '../../../types/assignmentStudents/update';
import {
    AssignmentStudentData,
} from '../../../types/assignmentStudents/list';


export const updateAssignmentStudent = createAsyncThunk<
    AssignmentStudentData,
    AssignmentStudentsUpdatePayload
>(
    'assignmentStudents/update',
    async ({ assignmentStudentId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(
                `${ASSIGNMENT_STUDENTS}/${assignmentStudentId}`,
                payload
            );

            return resp.data.data as AssignmentStudentData;

        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? 'updateAssignmentStudent failed'
            );
        }
    }
);
