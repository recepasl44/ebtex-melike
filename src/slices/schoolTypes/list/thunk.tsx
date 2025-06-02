import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOOL_TYPES } from "../../../helpers/url_helper";
import { SchoolTypesListResponse, SchoolTypeListArg } from "../../../types/schoolTypes/list";

export const fetchSchoolTypes = createAsyncThunk<SchoolTypesListResponse, SchoolTypeListArg>(
    "schoolTypes/fetchSchoolTypes",
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${SCHOOL_TYPES}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as SchoolTypesListResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Fetch school types failed"
            );
        }
    }
);
