import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { fetchQuizLevel } from "../../../slices/quizLevels/detail/thunk";
import { updateQuizLevel } from "../../../slices/quizLevels/update/thunk";
import { IQuizLevelUpdatePayload } from "../../../types/quizLevels/update";

export function useQuizLevelsDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.levelDetail
    );

    const getQuizLevel = useCallback(
        async (quizLevelId: number) => {
            const resultAction = await dispatch(fetchQuizLevel(quizLevelId));
            if (fetchQuizLevel.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    const updateExistingQuizLevel = useCallback(
        async (updatePayload: IQuizLevelUpdatePayload) => {
            const resultAction = await dispatch(updateQuizLevel(updatePayload));
            if (updateQuizLevel.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { quizLevel: data, status, error, getQuizLevel, updateExistingQuizLevel };
}
