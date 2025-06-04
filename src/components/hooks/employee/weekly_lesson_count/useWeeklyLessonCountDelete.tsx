// F:\xintra_react_ts\src\components\hooks\employee\weekly_lesson_count\useWeeklyLessonCountDelete.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteWeeklyLessonCount } from "../../../../slices/employee/weekly_lesson_count/delete/thunk";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";

export function useWeeklyLessonCountDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.weeklyLessonCountDelete
  );

  const deleteExistingWeeklyLessonCount = useCallback(
    async (id: number) => {
      const action = await dispatch(deleteWeeklyLessonCount(id));
      if (deleteWeeklyLessonCount.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === WeeklyLessonCountListStatus.LOADING;

  return {
    deletedWeeklyLessonCount: data,
    loading,
    error,
    deleteExistingWeeklyLessonCount,
  };
}
