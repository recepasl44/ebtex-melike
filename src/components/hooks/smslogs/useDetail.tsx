import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { fetchSmsLog } from '../../../slices/smslogs/detail/thunk';

export function useSmsLogDetail() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.smsLogDetail);

  const getSmsLog = useCallback(async (id: number) => {
    const resultAction = await dispatch(fetchSmsLog(id));
    if (fetchSmsLog.fulfilled.match(resultAction)) {
      return resultAction.payload;
    }
    return null;
  }, [dispatch]);

  return { smsLog: data, status, error, getSmsLog };
}
