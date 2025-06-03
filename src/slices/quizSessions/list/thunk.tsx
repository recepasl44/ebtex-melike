import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_SESSIONS } from "../../../helpers/url_helper";
import { QuizSessionsListResponse, QuizSessionListArg } from "../../../types/quizSessions/list";

export const fetchQuizSessions = createAsyncThunk<QuizSessionsListResponse, QuizSessionListArg>(
    "quizSessions/fetchQuizSessions",
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${QUIZ_SESSIONS}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as QuizSessionsListResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Fetch quiz sessions failed"
            );
        }
    }
);
