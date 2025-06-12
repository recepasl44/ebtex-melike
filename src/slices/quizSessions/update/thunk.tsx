
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_SESSIONS } from "../../../helpers/url_helper";
import { IQuizSession } from "../../../types/quizSessions/list";
import { IQuizSessionUpdatePayload } from "../../../types/quizSessions/update";

export const updateQuizSession = createAsyncThunk<IQuizSession, IQuizSessionUpdatePayload>(
    "quizSession/updateQuizSession",
    async ({ quizSessionId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${QUIZ_SESSIONS}/${quizSessionId}`, payload);
            return resp.data.data as IQuizSession;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Update quiz session failed"
            );
        }
    }
);
