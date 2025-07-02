import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchQuizStudent } from '../../../slices/quizstudents/detail/thunk';

export function useQuizStudentsDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizstudentsDetail);

  const getDetail = useCallback(async (id: number) => {
    const result = await dispatch(fetchQuizStudent(id));
    if (fetchQuizStudent.fulfilled.match(result)) {
      return result.payload;
    }
    return null;
  }, [dispatch]);

  return { detail: data, status, error, getDetail };
}
