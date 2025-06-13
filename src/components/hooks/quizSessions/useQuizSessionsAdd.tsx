import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { addQuizSession } from "../../../slices/quizSessions/add/thunk";
import { IQuizSessionAddPayload } from "../../../types/quizSessions/add";

export function useQuizSessionsAdd() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizSessionAdd
    );

    const addNewQuizSession = useCallback(
        async (payload: IQuizSessionAddPayload) => {
            const resultAction = await dispatch(addQuizSession(payload));
            if (addQuizSession.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { addedQuizSession: data, status, error, addNewQuizSession };
}
