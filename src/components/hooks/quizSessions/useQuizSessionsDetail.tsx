import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { fetchQuizSession } from "../../../slices/quizSessions/detail/thunk";
import { updateQuizSession } from "../../../slices/quizSessions/update/thunk";
import { IQuizSessionUpdatePayload } from "../../../types/quizSessions/update";

export function useQuizSessionsDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizSessionShow
    );

    const getQuizSession = useCallback(
        async (quizSessionId: number) => {
            const resultAction = await dispatch(fetchQuizSession(quizSessionId));
            if (fetchQuizSession.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    const updateExistingQuizSession = useCallback(
        async (updatePayload: IQuizSessionUpdatePayload) => {
            const resultAction = await dispatch(updateQuizSession(updatePayload));
            if (updateQuizSession.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { quizSession: data, status, error, getQuizSession, updateExistingQuizSession };
}
