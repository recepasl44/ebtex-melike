import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteSmsProvider } from '../../../slices/smsproviders/delete/thunk';
import { DeleteSmsProviderPayload } from '../../../types/smsproviders/delete';

export function useSmsProviderDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { deletedId, status, error } = useSelector((state: RootState) => state.smsProviderDelete);

  const removeProvider = useCallback(async (payload: DeleteSmsProviderPayload) => {
    const resultAction = await dispatch(deleteSmsProvider(payload));
    if (deleteSmsProvider.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { deletedId, status, error, removeProvider };
}
