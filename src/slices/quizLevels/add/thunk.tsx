import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_LEVELS } from "../../../helpers/url_helper";
import { IQuizLevelAddPayload } from "../../../types/quizLevels/add";
import { QuizLevel } from "../../../types/quizLevels/list";

export const addQuizLevel = createAsyncThunk<QuizLevel, IQuizLevelAddPayload>(
    "quizLevel/addQuizLevel",
    async (payload, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.post(QUIZ_LEVELS, payload);
            return resp.data.data as QuizLevel;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Add quiz level failed"
            );
        }
    }
);