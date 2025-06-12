import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addStudent } from '../../../slices/student/add/thunk';
import { AddStudentPayload, AddStudentResponse } from '../../../types/student/add';

export function useAddStudent() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector(
    (state: RootState) => state.studentAdd
  );

  const createStudent = useCallback(
    async (payload: AddStudentPayload) => {
      const resultAction = await dispatch(addStudent(payload));
      if (addStudent.fulfilled.match(resultAction)) {
        return resultAction.payload as AddStudentResponse;
      }
      return null;
    },
    [dispatch]
  );

  return { newStudent: data, status, error, createStudent };
}
