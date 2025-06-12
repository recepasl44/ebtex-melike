import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOLARSHIPS } from "../../../helpers/url_helper";
import { IScholarShipAddPayload } from "../../../types/scholarShips/add";
import { IScholarShip } from "../../../types/scholarShips/list";

export const addScholarship = createAsyncThunk<IScholarShip, IScholarShipAddPayload>(
    "scholarship/addScholarship",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(SCHOLARSHIPS, payload);
            return resp.data.data as IScholarShip;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Add scholarship failed"
            );
        }
    }
);
