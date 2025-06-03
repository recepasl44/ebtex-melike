import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { updateQuizTime } from "../../../slices/quizTimes/update/thunk";
import { IQuizTimeUpdatePayload } from "../../../types/quizTimes/update";

export function useQuizTimesUpdate() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizTimeUpdate
    );

    const updateExistingQuizTime = useCallback(
        async (payload: IQuizTimeUpdatePayload) => {
            const resultAction = await dispatch(updateQuizTime(payload));
            if (updateQuizTime.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { updatedQuizTime: data, status, error, updateExistingQuizTime };
}
