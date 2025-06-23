import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { deleteSmsLog } from '../../../slices/smslogs/delete/thunk';
import { DeleteSmsLogPayload } from '../../../types/smslogs/delete';

export function useSmsLogDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const { deletedId, status, error } = useSelector((state: RootState) => state.smsLogDelete);

  const removeLog = useCallback(async (payload: DeleteSmsLogPayload) => {
    const resultAction = await dispatch(deleteSmsLog(payload));
    if (deleteSmsLog.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { deletedId, status, error, removeLog };
}
