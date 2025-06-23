import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateSmsLog } from '../../../slices/smslogs/update/thunk';
import { UpdateSmsLogPayload } from '../../../types/smslogs/update';

export function useSmsLogUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.smsLogUpdate);

  const editLog = useCallback(async (payload: UpdateSmsLogPayload) => {
    const resultAction = await dispatch(updateSmsLog(payload));
    if (updateSmsLog.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { updatedSmsLog: data, status, error, editLog };
}
