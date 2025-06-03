// src/slices/quizLevels/list/thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_LEVELS } from "../../../helpers/url_helper";
import { QuizLevelsListResponse, QuizLevelListArg } from "../../../types/quizLevels/list";

export const fetchQuizLevels = createAsyncThunk<
    QuizLevelsListResponse,
    QuizLevelListArg
>(
    "quizLevels/fetchQuizLevels",
    async (queryParams, { rejectWithValue }) => {
        try {
            const qs = new URLSearchParams();
            Object.entries(queryParams).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    qs.append(key, String(value));
                }
            });
            const url = `${QUIZ_LEVELS}?${qs.toString()}`;
            const resp = await axiosInstance.get(url);
            return resp.data as QuizLevelsListResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Fetch quiz levels failed"
            );
        }
    }
);
