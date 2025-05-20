import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../services/axiosClient';
import { ASSIGNMENT_STUDENTS } from '../../../helpers/url_helper';
import { AssignmentStudentData } from '../../../types/assignmentStudents/list';

/**
 * Belirli bir Assignment-Student kaydını getirir
 */
export const fetchAssignmentStudent = createAsyncThunk<
    AssignmentStudentData,    // dönen değer
    number                    // parametre (ID)
>(
    'assignmentStudents/fetch',
    async (id, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.get(`${ASSIGNMENT_STUDENTS}/${id}`);
            // Backend cevabınız { data: { … } } formatındaysa:
            return resp.data.data as AssignmentStudentData;
            // Eğer doğrudan obje geliyorsa: return resp.data as AssignmentStudentData;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? 'fetchAssignmentStudent failed'
            );
        }
    }
);
