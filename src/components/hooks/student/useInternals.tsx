import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchStudentInternals } from '../../../slices/student/internals/thunk';
import { InternalsPayload, StudentInternalsResponse } from '../../../types/student/internals';

export function useInternals() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.studentInternals);
  const getInternals = useCallback(async (payload: InternalsPayload) => {
    const resultAction = await dispatch(fetchStudentInternals(payload));
    if (fetchStudentInternals.fulfilled.match(resultAction)) {
      return resultAction.payload as StudentInternalsResponse;
    }
    return null;
  }, [dispatch]);
  return { internals: data, status, error, getInternals };
}
