import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOLARSHIPS } from "../../../helpers/url_helper";
import { IScholarShip } from "../../../types/scholarShips/list";

export const fetchScholarship = createAsyncThunk<IScholarShip, number>(
    "scholarship/fetchScholarship",
    async (scholarshipId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${SCHOLARSHIPS}/${scholarshipId}`);
            return response.data.data as IScholarShip;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch scholarship failed"
            );
        }
    }
);
