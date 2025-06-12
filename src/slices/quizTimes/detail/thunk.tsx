import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";

import { QUIZ_TIMES } from "../../../helpers/url_helper";
import { IQuizTime } from "../../../types/quizTimes/list";

export const fetchQuizTime = createAsyncThunk<IQuizTime, number>(
    "quizTime/fetchQuizTime",
    async (quizTimeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${QUIZ_TIMES}/${quizTimeId}`);
            return response.data.data as IQuizTime;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch quiz time failed"
            );
        }
    }
);
