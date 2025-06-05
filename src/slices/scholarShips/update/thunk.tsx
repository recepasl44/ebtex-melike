import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { SCHOLARSHIPS } from "../../../helpers/url_helper";
import { IScholarShip } from "../../../types/scholarShips/list";
import { IScholarShipUpdatePayload } from "../../../types/scholarShips/update";

export const updateScholarship = createAsyncThunk<IScholarShip, IScholarShipUpdatePayload>(
    "scholarship/updateScholarship",
    async ({ scholarShipId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${SCHOLARSHIPS}/${scholarShipId}`, payload);
            return resp.data.data as IScholarShip;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Update scholarship failed"
            );
        }
    }
);
