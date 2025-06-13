import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOL_TYPES } from "../../../helpers/url_helper";
import { ISchoolType } from "../../../types/schoolTypes/list";
import { ISchoolTypeUpdatePayload } from "../../../types/schoolTypes/update";

export const updateSchoolType = createAsyncThunk<ISchoolType, ISchoolTypeUpdatePayload>(
    "schoolType/updateSchoolType",
    async ({ schoolTypeId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${SCHOOL_TYPES}/${schoolTypeId}`, payload);
            return resp.data.data as ISchoolType;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Update school type failed"
            );
        }
    }
);
