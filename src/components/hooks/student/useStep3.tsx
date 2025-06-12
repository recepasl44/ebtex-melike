import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { saveStudentStep3 } from '../../../slices/student/step3/thunk';
import { StudentStep3Payload, StudentStep3Response } from '../../../types/student/step3';

export function useStep3() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.studentStep3);

  const saveStep3 = useCallback(async (studentId: number,payload: StudentStep3Payload) => {
    const resultAction = await dispatch(saveStudentStep3({ studentId, payload }));
    if (saveStudentStep3.fulfilled.match(resultAction)) {
      return resultAction.payload as StudentStep3Response;
    }
    return null;
  }, [dispatch]);
  return { studentStep3: data, status, error, saveStep3 };
}
