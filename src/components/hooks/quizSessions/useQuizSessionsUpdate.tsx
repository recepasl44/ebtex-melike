// src/components/hooks/quizSessions/useQuizSessionsUpdate.tsx
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { updateQuizSession } from "../../../slices/quizSessions/update/thunk";
import { IQuizSessionUpdatePayload } from "../../../types/quizSessions/update";

export function useQuizSessionsUpdate() {
    const dispatch = useDispatch<AppDispatch>();

    const { data, status, error } = useSelector(
        (state: RootState) => state.quizSessionUpdate
    );

    const updateExistingQuizSession = useCallback(
        async (payload: IQuizSessionUpdatePayload) => {
            const action = await dispatch(updateQuizSession(payload));
            return updateQuizSession.fulfilled.match(action) ? action.payload : null;
        },
        [dispatch]
    );

    return { updatedQuizSession: data, status, error, updateExistingQuizSession };
}
