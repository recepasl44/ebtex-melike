import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_TIMES } from "../../../helpers/url_helper";
import { IQuizTime } from "../../../types/quizTimes/list";
import { IQuizTimeUpdatePayload } from "../../../types/quizTimes/update";

export const updateQuizTime = createAsyncThunk<IQuizTime, IQuizTimeUpdatePayload>(
    "quizTime/updateQuizTime",
    async ({ quizTimeId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${QUIZ_TIMES}/${quizTimeId}`, payload);
            return resp.data.data as IQuizTime;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Update quiz time failed"
            );
        }
    }
);
