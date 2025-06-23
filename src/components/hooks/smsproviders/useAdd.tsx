import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addSmsProvider } from '../../../slices/smsproviders/add/thunk';
import { AddSmsProviderPayload } from '../../../types/smsproviders/add';

export function useSmsProviderAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.smsProviderAdd);

  const addProvider = useCallback(async (payload: AddSmsProviderPayload) => {
    const resultAction = await dispatch(addSmsProvider(payload));
    if (addSmsProvider.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { addedSmsProvider: data, status, error, addProvider };
}
