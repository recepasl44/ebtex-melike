import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";

import { fetchQuizTime } from "../../../slices/quizTimes/detail/thunk";
import { updateQuizTime } from "../../../slices/quizTimes/update/thunk";
import { IQuizTimeUpdatePayload } from "../../../types/quizTimes/update";

export function useQuizTimesDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const { data, status, error } = useSelector(
        (state: RootState) => state.quizTimeShow
    );

    const getQuizTime = useCallback(
        async (quizTimeId: number) => {
            const resultAction = await dispatch(fetchQuizTime(quizTimeId));
            if (fetchQuizTime.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    const updateExistingQuizTime = useCallback(
        async (updatePayload: IQuizTimeUpdatePayload) => {
            const resultAction = await dispatch(updateQuizTime(updatePayload));
            if (updateQuizTime.fulfilled.match(resultAction)) {
                return resultAction.payload;
            }
            return null;
        },
        [dispatch]
    );

    return { quizTime: data, status, error, getQuizTime, updateExistingQuizTime };
}
