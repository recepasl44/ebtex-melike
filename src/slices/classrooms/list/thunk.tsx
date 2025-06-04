import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { CLASSROOMS } from "../../../helpers/url_helper";
import {
  ClassroomListArg,
  ListClassroomResponse,
} from "../../../types/classrooms/list";

export const fetchClassrooms = createAsyncThunk<
  ListClassroomResponse,
  ClassroomListArg,
  { rejectValue: string }
>(
  "classrooms/fetchClassrooms",
  async ({ branchId, page = 1, pageSize = 25 }, { rejectWithValue }) => {
    try {
      const qp = new URLSearchParams();
      qp.append("branch_id", String(branchId));
      qp.append("paginate", String(pageSize));
      qp.append("page", String(page));
      const resp = await axiosInstance.get(`${CLASSROOMS}?${qp.toString()}`);
      return resp.data as ListClassroomResponse;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch classrooms failed");
    }
  }
);
