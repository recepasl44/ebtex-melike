import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { addBulletin } from '../../../slices/bulletins/add/thunk';
import { BulletinsAddPayload } from '../../../types/bulletins/add';

export function useBulletinAdd() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.bulletinAdd);

  const addNewBulletin = useCallback(
    async (payload: BulletinsAddPayload) => {
      const resultAction = await dispatch(addBulletin(payload));
      if (addBulletin.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { addedBulletin: data, status, error, addNewBulletin };
}
