import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchDashboard } from '../../../slices/dashboard/list/thunk';
import { DashboardListStatus } from '../../../enums/dashboard/list';

export function useDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.dashboardData);

  useEffect(() => {
    if (status === DashboardListStatus.IDLE) {
      dispatch(fetchDashboard());
    }
  }, [status, dispatch]);

  return { data, status, error };
}
