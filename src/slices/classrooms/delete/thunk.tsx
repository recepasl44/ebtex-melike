import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CLASSROOMS } from "../../../helpers/url_helper";
import { ClassroomDeleteState } from "../../../types/classrooms/delete";

export const deleteClassroom = createAsyncThunk<ClassroomDeleteState, number>(
    "classrooms/deleteClassroom",
    async (classroomId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${CLASSROOMS}/${classroomId}`);
            return resp.data as ClassroomDeleteState;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete classroom failed"
            );
        }
    }
);
