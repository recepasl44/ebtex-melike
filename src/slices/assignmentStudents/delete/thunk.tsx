import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ASSIGNMENT_STUDENTS } from '../../../helpers/url_helper';
import {
    AssignmentStudentsDeleteState,
} from '../../../types/assignmentStudents/delete';

/**
 * Assignment-Student kaydını siler
 */
export const deleteAssignmentStudent = createAsyncThunk<
    AssignmentStudentsDeleteState,      // dönen değer
    number                              // parametre (ID)
>(
    'assignmentStudents/delete',
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(
                `${ASSIGNMENT_STUDENTS}/${id}`
            );
            return resp.data as AssignmentStudentsDeleteState;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? 'deleteAssignmentStudent failed'
            );
        }
    }
);
