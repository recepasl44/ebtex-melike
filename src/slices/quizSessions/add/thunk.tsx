import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_SESSIONS } from "../../../helpers/url_helper";
import { IQuizSessionAddPayload } from "../../../types/quizSessions/add";
import { IQuizSession } from "../../../types/quizSessions/list";

export const addQuizSession = createAsyncThunk<IQuizSession, IQuizSessionAddPayload>(
    "quizSession/addQuizSession",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(QUIZ_SESSIONS, payload);
            return resp.data.data as IQuizSession;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Add quiz session failed"
            );
        }
    }
);
