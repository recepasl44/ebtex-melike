import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { saveStudentStep2 } from '../../../slices/student/step2/thunk';
import { StudentStep2Payload, StudentStep2Response } from '../../../types/student/step2';

export function useStep2() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.studentStep2);
  const saveStep2 = useCallback(async (studentId: number, payload: StudentStep2Payload) => {
    const resultAction = await dispatch(saveStudentStep2({ studentId, payload }));
    if (saveStudentStep2.fulfilled.match(resultAction)) {
      return resultAction.payload as StudentStep2Response;
    }
    return null;
  }, [dispatch]);
  return { studentStep2: data, status, error, saveStep2 };
}
