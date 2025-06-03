import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { Studentinfo } from "../../../types/studentInfos/list";
import { StudentinfosUpdatePayload } from "../../../types/studentInfos/update";
import { STUDENT_INFOS } from "../../../helpers/url_helper";

export const updateStudentinfo = createAsyncThunk<
  Studentinfo,
  StudentinfosUpdatePayload
>(
  "studentinfos/updateStudentinfo",
  async ({ studentInfoId, payload }, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.put(
        `${STUDENT_INFOS}/${studentInfoId}`,
        payload
      );
      return resp.data.data as Studentinfo;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Update studentinfo failed"
      );
    }
  }
);
