import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { AppDispatch } from '../../../store';
import { fetchSmsProviders } from '../../../slices/smsproviders/list/thunk';
import { SmsProvidersListArg } from '../../../types/smsproviders/list';
import SmsProvidersListStatus from '../../../enums/smsproviders/list';

export function useSmsProvidersList(params: SmsProvidersListArg) {
  const dispatch = useDispatch<AppDispatch>();
  const { data, meta, links, status, error } = useSelector(
    (state: RootState) => state.smsProvidersList
  );

  const { enabled = true, ...filters } = params;

  useEffect(() => {
    if (enabled === false) return;
    dispatch(fetchSmsProviders({ enabled, ...filters }));
  }, [dispatch, enabled, JSON.stringify(filters)]);

  const loading = status === SmsProvidersListStatus.LOADING;
  return { smsProviders: data || [], meta, links, loading, error };
}
