import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateQuizStudent } from '../../../slices/quizstudents/update/thunk';
import { QuizStudentsUpdatePayload } from '../../../types/quizstudents/update';

export function useQuizStudentsUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizstudentsUpdate);

  const updateExisting = useCallback(
    async (payload: QuizStudentsUpdatePayload) => {
      const result = await dispatch(updateQuizStudent(payload));
      if (updateQuizStudent.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updated: data, status, error, updateExisting };
}
