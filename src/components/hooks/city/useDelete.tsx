import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import { RootState } from "../../../store/rootReducer";
import { deleteCourse } from "../../../slices/courses/delete/thunk";

export function useCourseDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.deleteCourse
  );

  const deleteExistingCourse = useCallback(
    async (courseId: number) => {
      const resultAction = await dispatch(deleteCourse(courseId));
      if (deleteCourse.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { useCourseDelete: data, status, error, deleteExistingCourse };
}
