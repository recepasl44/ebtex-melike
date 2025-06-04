import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { updateQuizLevel } from "../../../slices/quizLevels/update/thunk";
import { IQuizLevelUpdatePayload } from "../../../types/quizLevels/update";

export function useQuizLevelsUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizLevelUpdate
    );

    const updateExistingQuizLevel = useCallback(
        async (payload: IQuizLevelUpdatePayload) => {
            const resultAction = await dispatch(updateQuizLevel(payload));
            if (updateQuizLevel.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedQuizLevel: data, status, error, updateExistingQuizLevel };
}
