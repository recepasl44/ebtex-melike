// D:\xintra_react_ts\src\components\hooks\student\useStep1.tsx

import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { saveStudentStep1 } from '../../../slices/student/step1/thunk';
import { StudentStep1Payload, StudentStep1Response } from '../../../types/student/step1';

export function useStep1() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.studentStep1);

  const saveStep1 = useCallback(
    async (payload: StudentStep1Payload, studentId?: number) => {
      // Thunk param: { studentId, payload }
      const resultAction = await dispatch(saveStudentStep1({ payload, studentId }));
      if (saveStudentStep1.fulfilled.match(resultAction)) {
        return resultAction.payload as StudentStep1Response;
      }
      return null;
    },
    [dispatch]
  );

  return { studentStep1: data, status, error, saveStep1 };
}
