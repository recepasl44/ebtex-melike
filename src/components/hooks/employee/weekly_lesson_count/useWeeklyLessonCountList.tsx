import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/rootReducer";
import { AppDispatch } from "../../../../store";
import { fetchWeeklyLessonCountList } from "../../../../slices/employee/weekly_lesson_count/list/thunk";
import WeeklyLessonCountListStatus from "../../../../enums/employee/weekly_lesson_count/list";
import { WeeklyLessonCount ,WeeklyLessonCountListArgs} from "../../../../types/employee/weekly_lesson_count/list";

export function useWeeklyLessonCountList(params: WeeklyLessonCountListArgs) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.weeklyLessonCountList
  );

  const [filter] = useState<any>(null);
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(fetchWeeklyLessonCountList({
      ...otherParams,
      filter,
    }));
  }, [enabled, filter, dispatch, otherParams]);


  const counts: WeeklyLessonCount[] = data || [];
  const loading = status === WeeklyLessonCountListStatus.LOADING;

  return {
    counts,
    loading,
    error,
  };
}
