import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CLASSROOMS } from "../../../helpers/url_helper";
import { ClassroomDetailState } from "../../../types/classrooms/detail";

export const fetchClassroom = createAsyncThunk<ClassroomDetailState, number>(
    "classroom/fetchClassroom",
    async (classroomId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${CLASSROOMS}/${classroomId}`);
            return response.data.data as ClassroomDetailState;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch classroom failed"
            );
        }
    }
);
