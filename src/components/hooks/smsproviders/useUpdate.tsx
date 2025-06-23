import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateSmsProvider } from '../../../slices/smsproviders/update/thunk';
import { UpdateSmsProviderPayload } from '../../../types/smsproviders/update';

export function useSmsProviderUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.smsProviderUpdate);

  const editProvider = useCallback(async (payload: UpdateSmsProviderPayload) => {
    const resultAction = await dispatch(updateSmsProvider(payload));
    if (updateSmsProvider.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { updatedSmsProvider: data, status, error, editProvider };
}
