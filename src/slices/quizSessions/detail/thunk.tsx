import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";

import { QUIZ_SESSIONS } from "../../../helpers/url_helper";
import { IQuizSession } from "../../../types/quizSessions/list";

export const fetchQuizSession = createAsyncThunk<IQuizSession, number>(
    "quizSession/fetchQuizSession",
    async (quizSessionId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${QUIZ_SESSIONS}/${quizSessionId}`);
            return response.data.data as IQuizSession;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetch quiz session failed"
            );
        }
    }
);
