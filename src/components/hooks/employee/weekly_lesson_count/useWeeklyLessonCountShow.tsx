// F:\xintra_react_ts\src\components\hooks\employee\weekly_lesson_count\useWeeklyLessonCountShow.tsx

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchWeeklyLessonCountDetail } from "../../../../slices/employee/weekly_lesson_count/show/thunk";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";
import { WeeklyLessonCount } from "../../../../types/employee/weekly_lesson_count/list";

export function useWeeklyLessonCountShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.weeklyLessonCountShow
  );

  const getWeeklyLessonCount = useCallback(
    async (id: number) => {
      const action = await dispatch(fetchWeeklyLessonCountDetail(id));
      if (fetchWeeklyLessonCountDetail.fulfilled.match(action)) {
        return action.payload as unknown as WeeklyLessonCount;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === WeeklyLessonCountListStatus.LOADING;

  return {
    weeklyLessonCount: data,
    loading,
    error,
    getWeeklyLessonCount,
  };
}
