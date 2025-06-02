import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { completeStudentContract } from '../../../slices/student/step4/thunk';
import { StudentStep4Payload, StudentStep4Response } from '../../../types/student/step4';

export function useStep4() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.studentStep4);
  const saveStep4 = useCallback(async (payload: StudentStep4Payload) => {
    const resultAction = await dispatch(completeStudentContract({ studentId: 1, payload }));
    if (completeStudentContract.fulfilled.match(resultAction)) {
      return resultAction.payload as StudentStep4Response;
    }
    return null;
  }, [dispatch]);
  return { studentStep4: data, status, error, saveStep4 };
}
