import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { updateWeeklyLessonCount } from "../../../../slices/employee/weekly_lesson_count/update/thunk";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";
import { WeeklyLessonCountUpdatePayload } from "../../../../types/employee/weekly_lesson_count/update";

export function useWeeklyLessonCountUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.weeklyLessonCountUpdate
  );

  const updateExistingWeeklyLessonCount = useCallback(
    async (payload: WeeklyLessonCountUpdatePayload) => {
      const action = await dispatch(updateWeeklyLessonCount(payload));
      if (updateWeeklyLessonCount.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === WeeklyLessonCountListStatus.LOADING;

  return {
    updatedWeeklyLessonCount: data,
    loading,
    error,
    updateExistingWeeklyLessonCount,
  };
}
