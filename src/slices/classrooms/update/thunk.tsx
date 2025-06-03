// src/slices/classrooms/update/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CLASSROOMS } from "../../../helpers/url_helper";
import {
    ClassroomUpdatePayload,
    ClassroomUpdateState,
} from "../../../types/classrooms/update";

export const updateClassroom = createAsyncThunk<
    ClassroomUpdateState,
    ClassroomUpdatePayload
>("classrooms/updateClassroom", async ({ classroomId, payload }, { rejectWithValue }) => {
    try {
        /* ★ PUT /classrooms/{id} */
        const resp = await axiosInstance.put(`${CLASSROOMS}/${classroomId}`, payload);
        return resp.data.data as ClassroomUpdateState;
    } catch (err: any) {
        return rejectWithValue(
            err.response?.data?.message || "Update classroom failed"
        );
    }
});
