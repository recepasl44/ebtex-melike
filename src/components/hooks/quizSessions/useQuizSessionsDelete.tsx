import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteQuizSession } from "../../../slices/quizSessions/delete/thunk";

export function useQuizSessionsDelete() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizSessionDelete
    );

    const removeQuizSession = useCallback(
        async (quizSessionId: number) => {
            const resultAction = await dispatch(deleteQuizSession(quizSessionId));
            if (deleteQuizSession.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { deleteQuizSessionId: data, status, error, removeQuizSession };
}
