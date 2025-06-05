import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteStudent } from '../../../slices/student/delete/thunk';
import { DeleteStudentResponse } from '../../../types/student/delete';

export function useDeleteStudent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentDelete
  );

  const removeStudent = useCallback(
    async (studentId: number) => {
      const resultAction = await dispatch(deleteStudent(studentId));
      if (deleteStudent.fulfilled.match(resultAction)) {
        return resultAction.payload as DeleteStudentResponse;
      }
      return null;
    },
    [dispatch]
  );

  return { deletedStudent: data, status, error, removeStudent };
}
