import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";

import { SCHOOL_TYPES } from "../../../helpers/url_helper";
import { ISchoolType } from "../../../types/schoolTypes/list";

export const fetchSchoolType = createAsyncThunk<ISchoolType, number>(
    "schoolType/fetchSchoolType",
    async (schoolTypeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${SCHOOL_TYPES}/${schoolTypeId}`);
            return response.data.data as ISchoolType;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch school type failed"
            );
        }
    }
);
