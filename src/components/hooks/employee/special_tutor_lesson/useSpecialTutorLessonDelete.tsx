import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { deleteSpecialTutorLesson } from "../../../../slices/employee/special-tutor-lesson/delete/thunk";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";

export function useSpecialTutorLessonDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.specialTutorLessonDelete
  );

  const deleteExistingSpecialTutorLesson = useCallback(
    async (id: number) => {
      const action = await dispatch(deleteSpecialTutorLesson(id));
      if (deleteSpecialTutorLesson.fulfilled.match(action)) {
        return action.payload; // number | null
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === SpecialTutorLessonListStatus.LOADING;

  return {
    deletedSpecialTutorLesson: data,
    loading,
    error,
    deleteExistingSpecialTutorLesson,
  };
}
