import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosClient";
import { QUIZ_TIMES } from "../../../helpers/url_helper";
import { QuizTimesListResponse, QuizTimeListArg } from "../../../types/quizTimes/list";

export const fetchQuizTimes = createAsyncThunk<QuizTimesListResponse, QuizTimeListArg>(
    "quizTimes/fetchQuizTimes",
    async (queryParams, { rejectWithValue }) => {
        try {
            const queryString = new URLSearchParams(queryParams).toString();
            const url = `${QUIZ_TIMES}?${queryString}`;
            const resp = await axiosInstance.get(url);
            return resp.data as QuizTimesListResponse;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Fetch quiz times failed"
            );
        }
    }
);
