import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchSpecialTutorLessonList } from "../../../../slices/employee/special-tutor-lesson/list/thunk";
import { SpecialTutorLesson } from "../../../../types/employee/special_tutor_lesson/list";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";

export function useSpecialTutorLessonList(params: { enabled?: boolean; [key: string]: any }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.specialTutorLessonList
  );

 const [filter] = useState<any>(null);
  const { enabled, ...otherParams } = params;
  useEffect(() => {
    if (!enabled) return;

    dispatch(fetchSpecialTutorLessonList({
      ...otherParams,
      filter,
    }));
  }, [enabled, filter, dispatch, otherParams]);

  const lessons: SpecialTutorLesson[] = data || [];
  const loading = status === SpecialTutorLessonListStatus.LOADING;

  return {
    lessons,
    loading,
    error,
  };
}
