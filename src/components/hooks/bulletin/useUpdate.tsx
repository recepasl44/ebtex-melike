import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../store';
import { RootState } from '../../../store/rootReducer';
import { updateBulletin } from '../../../slices/bulletins/update/thunk';
import { BulletinsUpdatePayload } from '../../../types/bulletins/update';

export function useBulletinUpdate() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.bulletinUpdate);

  const updateExistingBulletin = useCallback(
    async (payload: BulletinsUpdatePayload) => {
      const resultAction = await dispatch(updateBulletin(payload));
      if (updateBulletin.fulfilled.match(resultAction)) {
        return resultAction.payload;
      }
      return null;
    },
    [dispatch]
  );

  return { updatedBulletin: data, status, error, updateExistingBulletin };
}
