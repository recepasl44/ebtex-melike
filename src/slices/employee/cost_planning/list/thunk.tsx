import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../services/axiosClient";
import { PERSONEL_COST_PLANNING } from "../../../../helpers/url_helper";
import { CostPlanningListResponse, CostPlanningListArgs } from "../../../../types/employee/cost_planning/list";

export const fetchCostPlanningList = createAsyncThunk<
  CostPlanningListResponse,
  CostPlanningListArgs
>(
  "costPlanning/fetchList",
  async (params, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query.append(key, String(value));
        }
      });
      const resp = await axiosInstance.get(
        `${PERSONEL_COST_PLANNING}?${query.toString()}`
      );
      return resp.data as CostPlanningListResponse;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch cost planning failed"
      );
    }
  }
);
