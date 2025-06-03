import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_TIMES } from "../../../helpers/url_helper";
import { IQuizTimeAddPayload } from "../../../types/quizTimes/add";
import { IQuizTime } from "../../../types/quizTimes/list";

export const addQuizTime = createAsyncThunk<IQuizTime, IQuizTimeAddPayload>(
    "quizTime/addQuizTime",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(QUIZ_TIMES, payload);
            return resp.data.data as IQuizTime;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Add quiz time failed"
            );
        }
    }
);
