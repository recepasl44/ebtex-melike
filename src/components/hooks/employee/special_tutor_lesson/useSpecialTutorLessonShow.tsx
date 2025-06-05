import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { fetchSpecialTutorLessonDetail } from "../../../../slices/employee/special-tutor-lesson/show/thunk";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";
import { SpecialTutorLesson } from "../../../../types/employee/special_tutor_lesson/list";

export function useSpecialTutorLessonShow() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.specialTutorLessonShow
  );

  const getSpecialTutorLesson = useCallback(
    async (id: number) => {
      const action = await dispatch(fetchSpecialTutorLessonDetail(id));
      if (fetchSpecialTutorLessonDetail.fulfilled.match(action)) {
        return action.payload as SpecialTutorLesson;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === SpecialTutorLessonListStatus.LOADING;

  return {
    specialTutorLesson: data,
    loading,
    error,
    getSpecialTutorLesson,
  };
}
