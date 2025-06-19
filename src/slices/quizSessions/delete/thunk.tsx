import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_SESSIONS } from "../../../helpers/url_helper";
import { QuizSessionDeleteState } from "../../../types/quizSessions/delete";

export const deleteQuizSession = createAsyncThunk<QuizSessionDeleteState, number>(
    "quizSession/deleteQuizSession",
    async (quizSessionId, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.delete(`${QUIZ_SESSIONS}/${quizSessionId}`);
            return resp.data as QuizSessionDeleteState;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Delete quiz session failed"
            );
        }
    }
);
