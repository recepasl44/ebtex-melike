import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_INFOS } from "../../../helpers/url_helper";
import { Studentinfo } from "../../../types/studentInfos/list";

export const fetchStudentinfo = createAsyncThunk<Studentinfo, number>(
  "studentinfos/fetchStudentinfo",
  async (studentinfoId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.get(`${STUDENT_INFOS}/${studentinfoId}`);
      return resp.data.data as Studentinfo;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Fetch studentinfo failed"
      );
    }
  }
);
