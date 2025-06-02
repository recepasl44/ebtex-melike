import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOL_TYPES } from "../../../helpers/url_helper";
import { SchoolTypeDeleteState } from "../../../types/schoolTypes/delete";

export const deleteSchoolType = createAsyncThunk<SchoolTypeDeleteState, number>(
    "schoolType/deleteSchoolType",
    async (schoolTypeId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${SCHOOL_TYPES}/${schoolTypeId}`);
            return resp.data as SchoolTypeDeleteState;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete school type failed"
            );
        }
    }
);
