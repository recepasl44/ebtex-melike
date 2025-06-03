import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_INFOS } from "../../../helpers/url_helper";
import { StudentinfosDeleteState } from "../../../types/studentInfos/delete";

export const deleteStudentinfo = createAsyncThunk<
  StudentinfosDeleteState,
  number
>(
  "studentinfos/deleteStudentinfo",
  async (studentinfoId, { rejectWithValue }) => {
    try {
      const resp = await axiosInstance.delete(
        `${STUDENT_INFOS}/${studentinfoId}`
      );
      return resp.data as StudentinfosDeleteState;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Delete studentinfo failed"
      );
    }
  }
);
