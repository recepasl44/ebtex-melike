import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateCourse } from '../../../slices/courses/update/thunk';
import { CoursesUpdatePayload } from '../../../types/courses/update';

export function useCourseUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state. courseUpdate);

  const updateExistingCourse = useCallback(
    async (payload: CoursesUpdatePayload) => {
      const resultAction = await dispatch(updateCourse(payload));
      if (updateCourse.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedCourse: data, status, error, updateExistingCourse };
}
