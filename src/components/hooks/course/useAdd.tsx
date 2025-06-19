import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addCourse } from '../../../slices/courses/add/thunk';
import { CoursesAddPayload } from '../../../types/courses/add';

export function useCourseAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.courseAdd);

  const addNewCourse = useCallback(
    async (payload: CoursesAddPayload) => {
      const resultAction = await dispatch(addCourse(payload));
      if (addCourse.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedCourse: data, status, error, addNewCourse };
}