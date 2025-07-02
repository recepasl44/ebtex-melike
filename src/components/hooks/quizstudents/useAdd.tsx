import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addQuizStudent } from '../../../slices/quizstudents/add/thunk';
import { QuizStudentsAddPayload } from '../../../types/quizstudents/add';

export function useQuizStudentsAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizstudentsAdd);

  const addNew = useCallback(
    async (payload: QuizStudentsAddPayload) => {
      const result = await dispatch(addQuizStudent(payload));
      if (addQuizStudent.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { added: data, status, error, addNew };
}
