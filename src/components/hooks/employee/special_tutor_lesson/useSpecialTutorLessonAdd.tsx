import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../../store";
import { RootState } from "../../../../store/rootReducer";
import { addSpecialTutorLesson } from "../../../../slices/employee/special-tutor-lesson/add/thunk";
import SpecialTutorLessonListStatus from "../../../../enums/employee/special_tutor_lesson/list";
import { SpecialTutorLessonAddPayload } from "../../../../types/employee/special_tutor_lesson/add";

export function useSpecialTutorLessonAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.specialTutorLessonAdd
  );

  const addNewSpecialTutorLesson = useCallback(
    async (payload: SpecialTutorLessonAddPayload) => {
      const action = await dispatch(addSpecialTutorLesson(payload));
      if (addSpecialTutorLesson.fulfilled.match(action)) {
        return action.payload;
      }
      return null;
    },
    [dispatch]
  );

  const loading = status === SpecialTutorLessonListStatus.LOADING;

  return {
    addedSpecialTutorLesson: data,
    loading,
    error,
    addNewSpecialTutorLesson,
  };
}
