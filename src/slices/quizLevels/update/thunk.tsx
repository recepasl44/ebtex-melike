import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_LEVELS } from "../../../helpers/url_helper";
import { QuizLevel } from "../../../types/quizLevels/list";
import { IQuizLevelUpdatePayload } from "../../../types/quizLevels/update";

export const updateQuizLevel = createAsyncThunk<QuizLevel, IQuizLevelUpdatePayload>(
    "quizLevel/updateQuizLevel",
    async ({ quizLevelId, payload }, { rejectWithValue }) => {
        try {
            const resp = await axiosInstance.put(`${QUIZ_LEVELS}/${quizLevelId}`, payload);
            return resp.data.data as QuizLevel;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Update quiz level failed"
            );
        }
    }
);
