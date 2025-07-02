import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteQuizStudent } from '../../../slices/quizstudents/delete/thunk';

export function useQuizStudentsDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.quizstudentsDelete);

  const deleteExisting = useCallback(
    async (id: number) => {
      const result = await dispatch(deleteQuizStudent(id));
      if (deleteQuizStudent.fulfilled.match(result)) {
        return result.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { deleted: data, status, error, deleteExisting };
}
