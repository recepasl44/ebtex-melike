import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOLARSHIPS } from "../../../helpers/url_helper";
import { IScholarShip } from "../../../types/scholarShips/list";

export const deleteScholarship = createAsyncThunk<IScholarShip, number>(
    "scholarship/deleteScholarship",
    async (scholarshipId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${SCHOLARSHIPS}/${scholarshipId}`);
            return resp.data.data as IScholarShip;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete scholarship failed"
            );
        }
    }
);
