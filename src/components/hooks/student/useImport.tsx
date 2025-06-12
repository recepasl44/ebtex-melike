import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { importStudents } from '../../../slices/student/import/thunk';
import { StudentImportPayload, StudentImportResponse } from '../../../types/student/import';

export function useImport() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.studentImport);
  const importStudentData = useCallback(async (payload: StudentImportPayload) => {
    const resultAction = await dispatch(importStudents(payload));
    if (importStudents.fulfilled.match(resultAction)) {
      return resultAction.payload as StudentImportResponse;
    }
    return null;
  }, [dispatch]);
  return { importedData: data, status, error, importStudentData };
}
