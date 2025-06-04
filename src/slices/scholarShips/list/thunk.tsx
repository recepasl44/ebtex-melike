import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOLARSHIPS } from "../../../helpers/url_helper";
import { ScholarShipsListResponse, ScholarShipListArg } from "../../../types/scholarShips/list";

export const fetchScholarships = createAsyncThunk<ScholarShipsListResponse, ScholarShipListArg>(
    "scholarships/fetchScholarships",
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${SCHOLARSHIPS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as ScholarShipsListResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Fetch scholarships failed"
            );
        }
    }
);
