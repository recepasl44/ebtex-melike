import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchSmsLogs } from '../../../slices/smslogs/list/thunk';
import { SmsLogsListArg } from '../../../types/smslogs/list';
import SmsLogsListStatus from '../../../enums/smslogs/list';

export function useSmsLogsList(params: SmsLogsListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, meta, links, status, error } = useSelector(
    (state: RootState) => state.smsLogsList
  );

  const { enabled = true, ...filters } = params;

  useEffect(() => {
    if (enabled === false) return;
    dispatch(fetchSmsLogs({ enabled, ...filters }));
  }, [dispatch, enabled, JSON.stringify(filters)]);

  const loading = status === SmsLogsListStatus.LOADING;
  return { smsLogs: data || [], meta, links, loading, error };
}
