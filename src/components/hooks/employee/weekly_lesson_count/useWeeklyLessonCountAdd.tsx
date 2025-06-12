import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addWeeklyLessonCount } from "../../../../slices/employee/weekly_lesson_count/add/thunk";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";
import { WeeklyLessonCountAddPayload } from "../../../../types/employee/weekly_lesson_count/add";

export function useWeeklyLessonCountAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.weeklyLessonCountAdd
  );

  const addNewWeeklyLessonCount = useCallback(
    async (payload: WeeklyLessonCountAddPayload) => {
      const action = await dispatch(addWeeklyLessonCount(payload));
      if (addWeeklyLessonCount.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === WeeklyLessonCountListStatus.LOADING;

  return {
    addedWeeklyLessonCount: data,
    loading,
    error,
    addNewWeeklyLessonCount,
  };
}
