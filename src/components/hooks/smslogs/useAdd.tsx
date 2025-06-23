import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addSmsLog } from '../../../slices/smslogs/add/thunk';
import { AddSmsLogPayload } from '../../../types/smslogs/add';

export function useSmsLogAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.smsLogAdd);

  const addLog = useCallback(async (payload: AddSmsLogPayload) => {
    const resultAction = await dispatch(addSmsLog(payload));
    if (addSmsLog.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { addedSmsLog: data, status, error, addLog };
}
