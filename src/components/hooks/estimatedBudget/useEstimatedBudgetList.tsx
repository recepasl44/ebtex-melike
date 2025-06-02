import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchEstimatedBudgets } from '../../../slices/estimatedBudget/list/thunk';
import { EstimatedBudgetStatus } from '../../../enums/estimatedBudget/list';

export function useEstimatedBudgetList(enabled: boolean = true) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, student_count, total, per_student, status, error } = useSelector(
    (state: RootState) => state.estimatedBudgetList
  );

  useEffect(() => {
    if (!enabled) return;
    dispatch(fetchEstimatedBudgets());
  }, [enabled, dispatch]);

  return {
    data: data || [],
    studentCount: student_count,
    total,
    perStudent: per_student,
    loading: status === EstimatedBudgetStatus.LOADING,
    error,
  };
}
