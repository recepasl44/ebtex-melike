// src/slices/classrooms/add/thunk.ts
import axiosInstance from "../../../services/axiosClient";
import { CLASSROOMS } from "../../../helpers/url_helper";
import { ClassroomAddPayload } from "../../../types/classrooms/add";
import { IClassroom } from "../../../types/classrooms/list";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addClassroom = createAsyncThunk<
    IClassroom,
    ClassroomAddPayload,
    { rejectValue: string }
>(
    "classrooms/addClassroom",
    async (payload, { rejectWithValue }) => {
        try {

            const resp = await axiosInstance.post(CLASSROOMS, payload);
            return resp.data.data as IClassroom;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message ?? "Add classroom failed"
            );
        }
    }
);
