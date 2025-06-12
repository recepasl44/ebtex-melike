import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { updateSpecialTutorLesson } from "../../../../slices/employee/special-tutor-lesson/update/thunk";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";
import { SpecialTutorLessonUpdatePayload } from "../../../../types/employee/special_tutor_lesson/update";

export function useSpecialTutorLessonUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.specialTutorLessonUpdate
  );

  const updateExistingSpecialTutorLesson = useCallback(
    async (payload: SpecialTutorLessonUpdatePayload) => {
      const action = await dispatch(updateSpecialTutorLesson(payload));
      if (updateSpecialTutorLesson.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === SpecialTutorLessonListStatus.LOADING;

  return {
    updatedSpecialTutorLesson: data,
    loading,
    error,
    updateExistingSpecialTutorLesson,
  };
}
