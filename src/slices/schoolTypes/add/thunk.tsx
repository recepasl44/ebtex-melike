import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOL_TYPES } from "../../../helpers/url_helper";
import { ISchoolTypeAddPayload } from "../../../types/schoolTypes/add";
import { ISchoolType } from "../../../types/schoolTypes/list";

export const addSchoolType = createAsyncThunk<ISchoolType, ISchoolTypeAddPayload>(
    "schoolType/addSchoolType",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(SCHOOL_TYPES, payload);
            return resp.data.data as ISchoolType;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Add school type failed"
            );
        }
    }
);
