import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSmsProvider } from '../../../slices/smsproviders/detail/thunk';

export function useSmsProviderDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.smsProviderDetail);

  const getProvider = useCallback(async (id: number) => {
    const resultAction = await dispatch(fetchSmsProvider(id));
    if (fetchSmsProvider.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { smsProvider: data, status, error, getProvider };
}
