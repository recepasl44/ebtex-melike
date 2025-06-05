import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { STUDENT_INFOS } from "../../../helpers/url_helper";
import { Studentinfo } from "../../../types/studentInfos/list";
import { StudentinfosAddPayload } from "../../../types/studentInfos/add";

export const addStudentinfo = createAsyncThunk<
  Studentinfo,
  StudentinfosAddPayload
>("studentinfos/addStudentinfo", async (payload, { rejectWithValue }) => {
  try {
    const resp = await axiosInstance.post(STUDENT_INFOS, payload);
    return resp.data.data as Studentinfo;
  } catch (err: any) {
    return rejectWithValue(
      err.response?.data?.message || "Add studentinfo failed"
    );
  }
});
